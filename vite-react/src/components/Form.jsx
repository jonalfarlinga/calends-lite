import Calendar from './Calendar.jsx'
import { useState, useEffect } from 'react';
import Inputs from './Inputs.jsx';

const initialData = {
    start: "",
    end: "",
    S: false,
    M: false,
    T: false,
    W: false,
    R: false,
    F: false,
    A: false,
    api: "",
};

function Form({uniStyle, setUniStyle}) {
    const [calendar, setCalendar] = useState(null);
    const [formData, setFormData] = useState(initialData);
    const [apis, setAPIs] = useState([])
    const [err, setErr] = useState('')

    const getAPIs = async () => {
        const url = `${import.meta.env.VITE_BACKEND_HOST}/api/list`;

        try {
            const response = await fetch(url);

            if (response.ok) {
                const data = await response.json();
                setAPIs(data.apis);
            } else {
                setErr(
                    <div
                      className="alert alert-warning alert-dismissible"
                      role="alert"
                    >
                      {`Invalid request at ${url}: ` + response.status}
                    </div>
                );
            }
        } catch (e) {
            setErr(
                <div
                  className="alert alert-danger alert-dismissible"
                  role="alert"
                >
                  {`Failed to fetch request at ${url}: ` + e}
                </div>
            );
        }
    }

    useEffect(() => {
        getAPIs()
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        setCalendar(null)
        let start = new Date(formData.start);
        let end = new Date(formData.end);
        if (end < start) {
            setErr(
                <div
                  className="alert alert-warning alert-dismissible"
                  role="alert">Start date must be earlier than end date.
                </div>
            )
        } else if (formData.S + formData.M + formData.T + formData.W +
            formData.R + formData.F + formData.A === 0) {
            setErr(
                <div
                  className="alert alert-warning alert-dismissible"
                  role="alert">At least one day of the week must be checked.
                </div>
            )
        } else {

            end = ("0" + (end.getUTCMonth() + 1)).slice(-2) +
                  ("0" + (end.getUTCDate())).slice(-2) +
                  ("" + end.getUTCFullYear()).slice(-2);
            start = ("0" + (start.getUTCMonth() + 1)).slice(-2) +
                    ("0" + (start.getUTCDate())).slice(-2) +
                    ("" + start.getUTCFullYear()).slice(-2);
            let days = "";
            if (formData.S) {days += "S"}
            if (formData.M) {days += "M"}
            if (formData.T) {days += "T"}
            if (formData.W) {days += "W"}
            if (formData.R) {days += "R"}
            if (formData.F) {days += "F"}
            if (formData.A) {days += "A"}

            setErr('');
            setCalendar(
                <Calendar
                    start={start}
                    end={end}
                    days={days}
                    api={formData.api}
                />);
        }
    };

    return (
        <>
            <form className="mt-3 mb-3 col" onSubmit={handleSubmit}>
              {err && (
                <div className='liveAlertPlaceholder'>
                  {err}
                </div>
              )}
              <Inputs
                apis={apis}
                formData={formData}
                setFormData={setFormData}
                uniStyle={uniStyle}
                setUniStyle={setUniStyle} />
              <button
                className=
                  { "btn btn-primary " +
                    (uniStyle ? "btn-" + uniStyle : null) }
              >
                Get Calendar
              </button>
            </form>
            {calendar}
        </>
    )
}

export default Form;
