from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@api_view(['GET'])
def health_check(request):
    # @param: request
    # @return: Response
    # @description: This function checks if the api is working
    
    return Response({'status': 'ok'})

@api_view(['GET'])
def candlestick(request):
    # @param: request
    # @return: Response
    # @description: This function returns the data for the candlestick chart
    
    data = {
        "data": [
            {"x": "2023-01-01", "open": 30, "high": 40, "low": 25, "close": 35},
            {"x": "2023-01-02", "open": 35, "high": 45, "low": 30, "close": 40},
        ]
    }
    
    return Response(data, status=status.HTTP_200_OK)

@api_view(['GET'])
def linechart(request):
    # @param: request
    # @return: Response
    # @description: This function returns the data for the line chart
    
    data = {
        "labels": ["Jan", "Feb", "Mar", "Apr"],
        "data": [10, 20, 30, 40]
    }
    
    return Response(data, status=status.HTTP_200_OK)

@api_view(['GET'])
def barchart(request):
    # @param: request
    # @return: Response
    # @description: This function returns the data for the bar chart
    
    data = {
        "labels": ["Product A", "Product B", "Product C"],
        "data": [100, 150, 200]
    }
    
    return Response(data, status=status.HTTP_200_OK)

@api_view(['GET'])
def piechart(request):
    # @param: request
    # @return: Response
    # @description: This function returns the data for the pie chart
    
    
    data = {
        "labels": ["Red", "Blue", "Yellow"],
        "data": [300, 50, 100]
    }
    
    return Response(data, status=status.HTTP_200_OK)
