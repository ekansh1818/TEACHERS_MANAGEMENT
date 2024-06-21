from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('api/teachers', views.get_all_teachers, name='get_all_teachers'),
    path('api/teachers', views.add_teacher, name='add_teacher'),
    path('api/teachers/<int:teacher_id>', views.update_teacher, name='update_teacher'),
    path('api/teachers/<int:teacher_id>', views.delete_teacher, name='delete_teacher'),
    path('api/teachers/filter', views.filter_teachers, name='filter_teachers'),
    path('api/teachers/search', views.search_teachers, name='search_teachers'),
    path('api/teachers/average-classes', views.calculate_average_classes, name='calculate_average_classes'),
]
