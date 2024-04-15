from datetime import datetime
import azure.functions as func
import logging
from acl.calendar_fetch import build_dates, get_TXST_holidays
import json

app = func.FunctionApp(http_auth_level=func.AuthLevel.ANONYMOUS)


@app.route(route="list")
def list(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Retreiving API list')

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


@app.route(route="TXST_calendar")
def TXST_calendar(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Retreiving TXST calendar')

    start = datetime.strptime(req.route_params.get('start'), "%m%d%y")
    end = datetime.strptime(req.route_params.get('end'), "%m%d%y")
    weekdays = req.route_params.get('weekdays')
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
