import json
from unittest import TestCase
from function_app import list, TXST_calendar, SUU_calendar
import azure.functions as func


class TestFunctions(TestCase):

    def test_list(self):
        # Arrange
        req = func.HttpRequest(
            method="GET",
            body=None,
            url="/list",
            params={}
        )

        # Act
        func_call = list.build().get_user_function()
        response = func_call(req)

        # Assert
        assert response.status_code == 200
        assert response.mimetype == 'text/plain'
        data = response.get_body()
        assert isinstance(data, bytes)
        data = json.loads(data.decode('utf-8'))
        assert isinstance(data, dict)
        assert data.get('apis')

    def test_TXST_cal(self):
        # Arrange
        req = func.HttpRequest(
            method="GET",
            body=None,
            url="/api/TXST_calendar",
            params={
                "start": "050824",
                "end": "060524",
                "weekdays": "MTW"
            }
        )

        # Act
        func_call = TXST_calendar.build().get_user_function()
        response = func_call(req)

        # Assert
        assert response.status_code == 200
        assert response.mimetype == 'application/json'
        data = response.get_body()
        data = json.loads(data.decode('utf-8'))
        assert isinstance(data, dict)
        assert data.get('dates')
        assert data.get('holidays')
        assert data.get('topics')

    def test_TXST_cal_invalid_format(self):
        # Arrange
        req = func.HttpRequest(
            method="GET",
            body=None,
            url="/api/TXST_calendar",
            params={
                "start": "05-08-24",
                "end": "06-05-24",
                "weekdays": "MTW"
            }
        )

        # Act
        func_call = TXST_calendar.build().get_user_function()
        response = func_call(req)

        # Assert
        assert response.status_code == 400
        assert response.mimetype == 'application/json'
        data = response.get_body()
        data = json.loads(data.decode('utf-8'))
        assert isinstance(data, dict)
        assert data.get('error')
        assert data.get('error').startswith("Bad Request")

    def test_SUU_cal(self):
        # Arrange
        req = func.HttpRequest(
            method="GET",
            body=None,
            url="/api/SUU_calendar",
            params={
                "start": "050824",
                "end": "060524",
                "weekdays": "MTW"
            }
        )

        # Act
        func_call = SUU_calendar.build().get_user_function()
        response = func_call(req)

        # Assert
        assert response.status_code == 200
        assert response.mimetype == 'application/json'
        data = response.get_body()
        data = json.loads(data.decode('utf-8'))
        assert isinstance(data, dict)
        assert data.get('dates')
        assert data.get('holidays')
        assert data.get('topics')

    def test_SUU_cal_invalid_format(self):
        # Arrange
        req = func.HttpRequest(
            method="GET",
            body=None,
            url="/api/SUU_calendar",
            params={
                "start": "05-08-24",
                "end": "06-05-24",
                "weekdays": "MTW"
            }
        )

        # Act
        func_call = SUU_calendar.build().get_user_function()
        response = func_call(req)

        # Assert
        assert response.status_code == 400
        assert response.mimetype == 'application/json'
        data = response.get_body()
        data = json.loads(data.decode('utf-8'))
        assert isinstance(data, dict)
        assert data.get('error')
        assert data.get('error').startswith("Bad Request")
