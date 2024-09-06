from django.urls import path
from .views import health_check, candlestick, linechart, barchart, piechart

urlpatterns = [
    path('healthcheck', health_check, name='health_check'),
    path ('candlestick-data', candlestick, name='candlestick-data'),
    path ('line-chart-data', linechart, name='linechart-data'),
    path ('bar-chart-data', barchart, name='barchart-data'),
    path ('pie-chart-data', piechart, name='piechart-data'),
]
