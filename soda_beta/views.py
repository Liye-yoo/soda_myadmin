from django.shortcuts import render

# Create your views here.
from django.views.generic import TemplateView

from soda_beta.models import Information


class MainView(TemplateView):
    template_name = 'soda_beta/soda_main.html'
    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        context['model'] = Information.objects.all()
        #Information.objects.raw('SELECT "name" from ')
        return context
