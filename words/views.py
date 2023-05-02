from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse, HttpResponse


from django.shortcuts import render
from django.core.cache import cache
#from . import terms_work
from .models import List, Word
import json


def index(request):
    return render(request, "index.html")


# def terms_list(request):
#     terms = terms_work.get_terms_for_table()
#     return render(request, "term_list.html", context={"terms": terms})


def add_term(request):
    return render(request, "term_add.html")


def create_list(request):
    data = json.loads(request.body.decode('utf-8'))
    word_list = List(name=data['listName'], description=data['description'], language=data['language'])
    word_list.save()
    for word in data['words']:
        Word.objects.create(list=word_list, word=word['word'],translation=word['translation'], status='new')
    return render(request, "index.html")


def lists_page(request):
    return render(request, 'lists_page.html')


def word_list_page(request):
    return render(request, 'word_list.html')


def learn(request):
    return render(request, 'learn.html')


def lists_list(request):
    data = []

    for wordList in List.objects.all():
        words_list = Word.objects.filter(list_id=wordList.id)
        words_learned = Word.objects.filter(list_id=wordList.id, status='learned')
        #print(words_list.count(), words_learned.count())
        newList = {
            'id': wordList.id,
            'name': wordList.name,
            'language': wordList.language,
            'description': wordList.description,
            'words_total': words_list.count(),
            'words_learned': words_learned.count()
        }
        data.append(newList)
        #print(data)
    return JsonResponse({'data': json.dumps(data)})


def list_words(request):
    listID = request.GET.get('listID')
    words_list = Word.objects.filter(list_id=listID)
    data = []
    for word in words_list:
        new_word = {
            'id': word.id,
            'word': word.word,
            'translation': word.translation,
            'status': word.status,
        }
        data.append(new_word)

    return JsonResponse({'data': json.dumps(data)})
# def send_term(request):
#     if request.method == "POST":
#         cache.clear()
#         user_name = request.POST.get("name")
#         new_term = request.POST.get("new_term", "")
#         new_definition = request.POST.get("new_definition", "").replace(";", ",")
#         context = {"user": user_name}
#         if len(new_definition) == 0:
#             context["success"] = False
#             context["comment"] = "Описание должно быть не пустым"
#         elif len(new_term) == 0:
#             context["success"] = False
#             context["comment"] = "Термин должен быть не пустым"
#         else:
#             context["success"] = True
#             context["comment"] = "Ваш термин принят"
#             terms_work.write_term(new_term, new_definition)
#         if context["success"]:
#             context["success-title"] = ""
#         return render(request, "term_request.html", context)
#     else:
#         add_term(request)
#
#


def stats(request):
    return render(request, "stats.html")


def set_word_status(request):
    data = json.loads(request.body.decode('utf-8'))
    word = Word.objects.get(id=data['word_id'])
    word.status = data['status']
    word.save()
    return HttpResponse(status=200)


def get_stats(request):
    data = {
        'lists_amount': List.objects.count(),
        'words_amount': Word.objects.count(),
        'words_learned': Word.objects.filter(status='learned').count()
    }
    return JsonResponse({'data': json.dumps(data)})
