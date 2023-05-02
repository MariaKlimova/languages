from django.urls import path

from . import views

urlpatterns = [
    path('', views.index),
    #path('terms-list', views.terms_list),
    path('add-term', views.add_term),
    path('lists-page', views.lists_page),
    path('lists-list', views.lists_list),
    path('list-words', views.list_words),
    path('learn', views.learn),
    #path('send-term', views.send_term),
    path('create-list', views.create_list),
    path('set-word-status', views.set_word_status),
    path('word-list', views.word_list_page),
    path('stats', views.stats),
    path('get-stats', views.get_stats)
]