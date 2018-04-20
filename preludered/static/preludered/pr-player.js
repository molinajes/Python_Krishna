$.fn.animateRotate = function(from, to, duration, easing, complete)
{
    var args = $.speed(duration, easing, complete);
    var step = args.step;

    return this.each(function(i, e) {
        args.step = function(now) {
            $.style(e, 'transform', 'rotate(' + now + 'deg)');
            if (step) return step.apply(this, arguments);
        };

        $({deg: from}).animate({deg: to}, args);
    });
};


var player =
{
    circle : null,
    currentRotation : 0,
    currentTrackStartingRotation: 0,
    rotationSpaceBetweenTracks : 0,

    totalTracks : 13,
    currentTrack : 1,
    playlist : [],
    lockAnimation : 0,

    init : function()
    {
        this.circle = $('#playerCircle');
        this.rotationSpaceBetweenTracks = (360/this.totalTracks) * -1;
    },

    play : function(track)
    {
        if(this.lockAnimation) return;
        this.playAnimations();

        if(this.playlist[this.currentTrack] && this.playlist[this.currentTrack].playing())
        {
            this.stop();
        }

        this.positionCircle(track);

        if(this.playlist[track] && this.playlist[track].state() == 'loaded')
        {
            this.pauseAll();
            this.playlist[track].play();
        } else {
            var trackObj = this.loadTrack(track);
            trackObj.once("load", function() {
                player.pauseAll();
                this.play();
            });
        }
    },

    pause : function()
    {
        if(!this.playlist[this.currentTrack]) {
            this.play(this.currentTrack);
            return false;
        }

        if(!this.playlist[this.currentTrack].playing()) {
            this.playAnimations();
            this.playlist[this.currentTrack].play();
        } else {
            this.pauseAnimations();
            this.playlist[this.currentTrack].pause();
        }
    },

    pauseAll : function()
    {
        for (var track = 1; track < this.totalTracks; track++) {
            if(this.playlist[track] && this.playlist[track].state() == 'loaded')
            {
                this.playlist[track].pause();
            }
        }
    },

    pauseAnimations : function()
    {
        $('.playerDirections img').attr('src', '/static/img/player-directions-whenpaused.png');
    },

    playAnimations : function ()
    {
        $('.playerDirections img').attr('src', '/static/img/player-directions-whenplaying.png');
    },

    stop : function()
    {
        this.playlist[this.currentTrack].stop();
    },

    getNextTrackNumber : function()
    {
        var next = this.currentTrack + 1;
        return (next > this.totalTracks) ? 1 : next;
    },

    playNextTrack : function()
    {
        //this.stop();
        this.play(this.getNextTrackNumber());
    },

    loadNextTrack : function()
    {
        if(!this.playlist[this.getNextTrackNumber()])
        {
            this.loadTrack(this.getNextTrackNumber());
        }
    },

    positionCircle : function(track)
    {
        if(this.lockAnimation) return;
        this.lockAnimation = 1;

        if(track < this.currentTrack)
        {
           var tracksToSkip = (this.totalTracks - this.currentTrack) + track;
        } else {
            var tracksToSkip = track - this.currentTrack;
        }

        var moveTo = (this.rotationSpaceBetweenTracks * tracksToSkip) + this.currentTrackStartingRotation;

        this.circle.animateRotate(this.currentRotation, moveTo, 500, 'swing', function() {
            player.lockAnimation = 0;
        });

        this.currentRotation = moveTo;
        this.currentTrackStartingRotation = moveTo;

        this.currentTrack = track;
    },

    loadTrack : function(track)
    {
        this.playlist[track] = new Howl({
            src : ['/static/preludered/music/' + track + '.mp3'],
            onplay: function() {
                requestAnimationFrame(player.step.bind(player));
            },
            onend: function() {
                player.playNextTrack();
            }
        });

        return this.playlist[track];
    },

    step: function() {
        var self = this;

        // Determine our current seek position.
        var currentTrack = this.playlist[this.currentTrack];

        var seek = currentTrack.seek() || 0;
        var percent = ((seek / currentTrack.duration()) || 0);
        var change = this.rotationSpaceBetweenTracks * percent;
        var rotation = this.currentTrackStartingRotation + change;
        this.currentRotation = rotation;
        if(!this.lockAnimation)
        {
            this.circle.css('transform', 'rotate(' + rotation + 'deg)');
        }

        // At 10% though the track, start loading the next one
        if(Math.floor(percent * 100) > 10)
        {
            this.loadNextTrack();
        }

        // If the song is still playing, continue stepping.
        if (currentTrack.playing())
        {
          requestAnimationFrame(self.step.bind(self));
        }
    },
};


var nav =
{
    locations : {
        'prelude-red' : {
            'hover' : 'nav-prelude-red.png',
            'click' : function() {
                nav.load_page('/preludered/nav/prelude-red');
            }
        },
        'libretto' : {
            'hover' : 'nav-libretto.png',
            'click' : function() {
                if(player.currentTrack > 9) {
                    var cur = player.currentTrack - 2;
                } else {
                    var cur = player.currentTrack - 1;
                }
                nav.load_page('/preludered/nav/libretto/' + cur);
            }
        },
        'notes' : {
            'hover' : 'nav-notes.png',
            'click' : function() {
                nav.load_page('/preludered/nav/notes');
            }
        },
        'credits' : {
            'hover' : 'nav-credits.png',
            'click' : function() {
                nav.load_page('/preludered/nav/credits');
            }
        },
        'music-videos' : {
            'hover' : 'nav-music-videos.png',
            'click' : function() {
                nav.load_page('/preludered/nav/music-videos');
            }
        },
        'digital-copy' : {
            'hover' : 'nav-digital-copy.png'
        },
        'signed-album' : {
            'hover' : 'nav-signed-album.png'
        }
    },

    init : function() {
        for (var key in this.locations)
        {
            if (this.locations.hasOwnProperty(key))
            {
                var loc = this.locations[key];

                // Preload image so its not fetched on each hover
                this.locations[key].hoverimg = new Image();
                this.locations[key].hoverimg.src = '/static/img/' + loc.hover;

                // Create hover listener
                $('.nav-' + key).hover(this.hover(loc),
                function() {
                    $('.nav > img').attr('src', '/static/img/nav.png');
                });

                // Create click listener
                if(typeof this.click != 'undefined') {
                    $('.nav-' + key).click(this.click(loc))
                }

                // Load hash requested location
                var hash = window.location.hash.substr(1);
                if(hash && typeof this.locations[hash] !== 'undefined')
                {
                    this.locations[hash].click();
                }
            }
        }
    },

    hover : function(loc)
    {
        return function(event)
        {
            $('.nav > img').attr('src', '/static/img/' + loc.hover);
        }
    },

    click : function(loc)
    {
        return function(event)
        {
            loc.click();
            return false;
        }
    },

    load_page : function(url)
    {
        $.get(url, function(data) {
            $(".columnLeftPage").html(data);
        });
    },

}


