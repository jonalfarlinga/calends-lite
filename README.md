# calends-lite ver 1.0
This app presents an HTML table, showing the class meeting dates for a specified time frame and automatically fills in when those dates fall on hoidays. The backend runs on Azure serverless technology. Calends currently supports SUU and TXST Academic Calendars.

### Contents

- [Quickstart](#quickstart)
  - [Output](#output)
- [API Documentation](#api-documentation)
- [Contacts and Copyright](#contact-and-copyright)

## Quickstart

Navigate to [Calends Online](https://calends.proficientdr.com)

![CalendsApp](https://github.com/jonalfarlinga/calends-lite/assets/138133515/a77cfc81-f217-41c2-9547-0501451853ea)

1. Choose an institution from the dropdown list

2. Select a first day of classes.

3. Select the last day of classes. Currently Calends does not search for exam dates, so select the last day of classes before exams begin, not the first or last day of exams.

4. Select checkboxes for days of the week that classes meet.

5. Click `Get Calendar`!

### Output

Calends creates a table in HTML and presents it to the user, filling in class dates and holidays. You can easily highlight and copy/paste into your favorite document writing program.

![CalendsOut](https://github.com/jonalfarlinga/calends-lite/assets/138133515/3d4ee973-ccf9-4af4-8721-988d5f5e98c8)

## API Documentation

- /api/list

Responds to a GET request with a hard-coded list of the active endpoints including the path and description.

For example:

```json
{
    "apis": [
        {"name": "Texas State", "href": "TXST_calendar"},
        {"name": "Southern Utah", "href": "SUU_calendar"},
        {"name": "Invalid - Comma-Separated Values", "href": "CSV_calendar"}
    ]
}
```

- _/api/TXST_calendar_
- _/api/SUU_calendar_

Responds to a GET request that includes a query string with the following arguments:
>    start: "ddmmyy"<br>
>    end: "ddmmyy"<br>
>   weekdays: "SMTWRFA"<br>

The endpoint activates the Calends anti-corruption layer that srapes the target institution's calendar page and extracts holiday dates. Then the dates of class meetings are constructed, fikking in data where the holiday dates intersect with class meetings.

On a successful GET request, returns a dictionary with three keys:
>   "dates": list of dates the class meets,<br>
>   "topics": list of blanks for filling in topic for the day,<br>
>   "assignments": list that is blank except on holidays,<br>

## Contact and Copyright

Created by Denny Bucklin aka [jonalfarlinga](https://github.com/jonalfarlinga)

This work is provided for educational and informational purposes. No consideration or attribution necessary as long as this work is not used to generate revenue.
