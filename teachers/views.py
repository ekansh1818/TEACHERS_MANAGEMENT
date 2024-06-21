from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.db.models import Avg
from django.views.decorators.csrf import csrf_exempt
from .models import Teacher
import json

def index(request):
    return render(request, 'teachers/index.html')

def get_all_teachers(request):
    teachers = Teacher.objects.all()
    data = [{"id": t.id, "name": t.name, "age": t.age, "dob": t.dob, "num_classes": t.num_classes} for t in teachers]
    return JsonResponse(data, safe=False)

@csrf_exempt
def add_teacher(request):
    if request.method == "POST":
        data = json.loads(request.body)
        teacher = Teacher(name=data['name'], age=data['age'], dob=data['dob'], num_classes=data['num_classes'])
        teacher.save()
        return JsonResponse({"message": "Teacher added successfully"}, status=201)

@csrf_exempt
def update_teacher(request, teacher_id):
    teacher = get_object_or_404(Teacher, pk=teacher_id)
    if request.method == "PUT":
        data = json.loads(request.body)
        teacher.name = data['name']
        teacher.age = data['age']
        teacher.dob = data['dob']
        teacher.num_classes = data['num_classes']
        teacher.save()
        return JsonResponse({"message": "Teacher updated successfully"})

@csrf_exempt
def delete_teacher(request, teacher_id):
    teacher = get_object_or_404(Teacher, pk=teacher_id)
    if request.method == "DELETE":
        teacher.delete()
        return JsonResponse({"message": "Teacher deleted successfully"})

def filter_teachers(request):
    age = request.GET.get('age')
    num_classes = request.GET.get('num_classes')
    if age:
        teachers = Teacher.objects.filter(age=age)
    elif num_classes:
        teachers = Teacher.objects.filter(num_classes=num_classes)
    else:
        teachers = []
    data = [{"id": t.id, "name": t.name, "age": t.age, "dob": t.dob, "num_classes": t.num_classes} for t in teachers]
    return JsonResponse(data, safe=False)

def search_teachers(request):
    name = request.GET.get('name')
    teachers = Teacher.objects.filter(name__icontains=name)
    data = [{"id": t.id, "name": t.name, "age": t.age, "dob": t.dob, "num_classes": t.num_classes} for t in teachers]
    return JsonResponse(data, safe=False)

def calculate_average_classes(request):
    teachers = Teacher.objects.all()
    if teachers.exists():
        avg_classes = teachers.aggregate(average_classes=Avg('num_classes'))['average_classes']
    else:
        avg_classes = 0
    return JsonResponse({'average_classes': avg_classes})
