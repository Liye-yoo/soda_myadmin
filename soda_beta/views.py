from django.shortcuts import render

# Create your views here.
from django.views.generic import TemplateView

from soda_beta.models import Information, Makeup


class MainView(TemplateView):
    template_name = 'soda_beta/soda_main.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        # 장고는 아래의 함수로 쿼리를 알아서 생성 및 실행하고 모델에 담아준다.
        #obj = Makeup.objects.filter(builtin_id=3001)
        # 장고는 또 raw를 써서 쿼리를 날려주고, 모델에 담아준다.
        #obj = Makeup.objects.raw("SELECT id,type FROM makeup WHERE builtin_id=3001")
        #context['model'] = obj
        #Information.objects.raw('SELECT "name" from ')
        return context

class QAHelperView(TemplateView):
    template_name = 'soda_beta/soda_qahelper.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        # 장고는 아래의 함수로 쿼리를 알아서 생성 및 실행하고 모델에 담아준다.
        #obj = Makeup.objects.filter(builtin_id=3001)
        # 장고는 또 raw를 써서 쿼리를 날려주고, 모델에 담아준다.
        #obj = Makeup.objects.raw("SELECT id,type FROM makeup WHERE builtin_id=3001")
        #context['model'] = obj
        #Information.objects.raw('SELECT "name" from ')
        return context


