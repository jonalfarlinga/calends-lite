# calends-lite ver 1.0
This app presents an HTML table, showing the class meeting dates for a specified time frame and automatically fills in when those dates fall on hoidays. The backend runs on Azure serverless technology. Calends currently supports SUU and TXST Academic Calendars.

# Quickstart

Navigate to [Calends Online](https://calends.proficientdr.com)

![Calends App](img\CalendsApp.png)

1. Choose an institution from the dropdown list

2. Select a first day of classes.

3. Select the last day of classes. Currently Calends does not search for exam dates, so select the last day of classes before exams begin, not the first or last day of exams.

4. Select checkboxes for days of the week that classes meet.

5. Click `Get Calendar`!

# Output

Calends creates a table in HTML and presents it to the user, filling in class dates and holidays. You can easily highlight and copy/paste into your favorite document writing program.

![CalendsOutput](img\CalendsOut.png)

# API Documentation

- _/api/TXST_calendar_
- _/api/SUU_calendar_

Responds to a GET request with a query string including:
>    start: "ddmmyy"<br>
>    end: "ddmmyy"<br>
>   weekdays: "SMTWRFA"<br>

On GET request returns a dictionary with three keys:
>   "dates": list of dates the class meets,<br>
>   "topics": list of blanks for filling in topic for the day,<br>
>   "assignments": list that is blank except on holidays,<br>



# Contact and Copyright

Created by Denny Bucklin aka [jonalfarlinga](https://github.com/jonalfarlinga)

This work is provided for educational and informational purposes. No consideration or attribution necessary as long as this work is not used to generate revenue.
