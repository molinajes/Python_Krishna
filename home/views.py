from django.shortcuts import render

# Create your views here.
def home(request):
    return render(request, 'home/home.html')

def works(request):
    return render(request, 'home/works.html')

def live(request):
    return render(request, 'home/live.html')

def connect(request):
    return render(request, 'home/connect.html')
