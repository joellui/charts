from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient


class HealthCheckTestCase(TestCase):
    # @setUp: Setting up the test client
    # @test_health_check: Checking if the api is returning the correct response
    
    def setUp(self):
        self.client = APIClient()

    def test_health_check(self):
        response = self.client.get(reverse('health_check'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {'status': 'ok'})
        
class chartTestCase(TestCase):
    # @setUp: Setting up the test client
    # @test_candlestick: Checking if the api is returning the correct response for candlestick chart
    # @test_linechart: Checking if the api is returning the correct response for linechart
    # @test_barchart: Checking if the api is returning the correct response for barchart
    # @test_piechart: Checking if the api is returning the correct response for piechart
    
    
    
    def setUp(self):
        self.client = APIClient()

    def test_candlestick(self):
        response = self.client.get(reverse('candlestick-data'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {'data': [{'x': '2023-01-01', 'open': 30, 'high': 40, 'low': 25, 'close': 35}, {'x': '2023-01-02', 'open': 35, 'high': 45, 'low': 30, 'close': 40}]})
        
    def test_linechart(self):
        response = self.client.get(reverse('linechart-data'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {'labels': ['Jan', 'Feb', 'Mar', 'Apr'], 'data': [10, 20, 30, 40]})
    
    def test_barchart(self):
        response = self.client.get(reverse('barchart-data'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {'labels': ['Product A', 'Product B', 'Product C'], 'data': [100, 150, 200]})
        
    def test_piechart(self):
        response = self.client.get(reverse('piechart-data'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {'labels': ['Red', 'Blue', 'Yellow'], 'data': [300, 50, 100]})
    
    


