from datetime import datetime
import azure.functions as func
import logging
from acl.calendar_fetch import build_dates, get_SUU_holidays, get_TXST_holidays
import json

app = func.FunctionApp(http_auth_level=func.AuthLevel.ANONYMOUS)


@app.route(route="/api/list")
def list(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Retrieving API list')

    return func.HttpResponse(
        json.dumps({
            "apis": [
                {"name": "Texas State", "href": "TXST_calendar"},
                {"name": "Southern Utah", "href": "SUU_calendar"},
                {
                    "name": "Invalid - Comma-Separated Values",
                    "href": "CSV_calendar",
                },
            ]
        }),
        status_code=200
    )


@app.route(route="/api/TXST_calendar")
def TXST_calendar(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Retrieving TXST calendar')

    start = datetime.strptime(req.params.get('start'), "%m%d%y")
    end = datetime.strptime(req.params.get('end'), "%m%d%y")
    weekdays = req.params.get('weekdays')
    logging.info(f"Getting TXST holidays from {start} to {end} on {weekdays}")
    holidays = get_TXST_holidays(start, end)
    logging.info(f"Dates returned: {holidays}")
    class_dates = build_dates(
        start,
        end,
        weekdays,
        holidays
    )
    logging.info("Returning calendar")
    return func.HttpResponse(
        json.dumps(class_dates),
        mimetype="application/json",
        status_code=200
    )


@app.route(route="/api/SUU_calendar")
def SUU_calendar(req: func.HttpRequest) -> func.HttpResponse:
    '''
    On GET request returns a dictionary with three keys:
        "dates": list of dates the class meets,
        "topics": list of blanks for filling in topic for the day,
        "assignments": list that is blank except on holidays,
    '''
    logging.info('Retrieving SUU calendar')
    start = datetime.strptime(req.params.get('start'), "%m%d%y")
    end = datetime.strptime(req.params.get('end'), "%m%d%y")
    weekdays = req.params.get('weekdays')
    logging.info(f"Getting SUU holidays from {start} to {end} on {weekdays}")
    holidays = get_SUU_holidays(start, end)
    logging.info(f"Dates returned: {holidays}")
    class_dates = build_dates(
        start,
        end,
        weekdays,
        holidays
    )
    logging.info('Returning calendar')
    return func.HttpResponse(
        json.dumps(class_dates),
        mimetype="application/json",
        status_code=200
    )


@app.route(route="/api/CSV_calendar")
def CSV_calendar(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Retrieving calendar with CSV holidays')
    logging.error('NOT YET IMPLEMENTED')
    return func.HttpResponse(
        "This endpoint has not been implemented",
        status_code=501
    )
