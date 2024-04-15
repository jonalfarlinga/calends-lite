export default function Inputs(props) {
    const {formData, setFormData, apis, uniStyle, setUniStyle} = props
    const handleChange = (e) => {
        if (e.target.name === "api") {
          setUniStyle(
            e.target.value === 'TXST_calendar' ? "txst" :
              e.target.value === 'SUU_calendar' ? "suu" :
              null
          )
        }
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
    };

    const handleCheck = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.checked
        });
    };

    return (
        <>
              <div className="mb-3">
                <select
                  onChange={handleChange}
                  value={formData.api}
                  required
                  id="api"
                  name="api"
                  className="form-select"
                >
                  <option value="">Choose an Academic Calendar</option>
                  {apis.map(api => {
                    return (
                      <option value={api.href} key={api.href}>
                        {api.name}
                      </option>
                    )
                  })}
                </select>
              </div>
              <div className="form-floating mb-3">
                <input
                  value={formData.start}
                  onChange={handleChange}
                  type="date"
                  required name="start"
                  id="start"
                  className="form-control"/>
                <label htmlFor="start">First day of class</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  value={formData.end}
                  onChange={handleChange}
                  type="date"
                  required name="end"
                  id="end"
                  className="form-control"/>
                <label htmlFor="end">Last day of class</label>
              </div>
              <div className="form-group mb-3" id="days-checklist">
                <h6>Days that class meets</h6>
                <div>
                  <input
                    checked={formData.S}
                    onChange={handleCheck}
                    type="checkbox"
                    name="S"
                    id="S"
                    className="form-check-input"/>
                  <label
                    className="form-check-label ms-1 me-3"
                    htmlFor="S"
                  >
                    Sunday
                  </label>
                </div>
                <div>
                  <input
                    checked={formData.M}
                    onChange={handleCheck}
                    type="checkbox"
                    name="M"
                    id="M"
                    className="form-check-input"/>
                  <label
                    className="form-check-label ms-1 me-3"
                    htmlFor="M"
                  >
                    Monday
                  </label>
                </div>
                <div>
                  <input
                    checked={formData.T}
                    onChange={handleCheck}
                    type="checkbox"
                    name="T"
                    id="T"
                    className="form-check-input"/>
                  <label
                    className="form-check-label ms-1 me-3"
                    htmlFor="M"
                  >
                    Tuesday
                  </label>
                </div>
                <div>
                  <input
                    checked={formData.W}
                    onChange={handleCheck}
                    type="checkbox"
                    name="W"
                    id="W"
                    className="form-check-input"/>
                  <label
                    className="form-check-label ms-1 me-3"
                    htmlFor="W"
                  >
                    Wednesday
                  </label>
                </div>
                <div>
                  <input
                    checked={formData.R}
                    onChange={handleCheck}
                    type="checkbox"
                    name="R"
                    id="R"
                    className="form-check-input"/>
                  <label
                    className="form-check-label ms-1 me-3"
                    htmlFor="R"
                  >
                    Thursday
                  </label>
                </div>
                <div>
                  <input
                    checked={formData.F}
                    onChange={handleCheck}
                    type="checkbox"
                    name="F"
                    id="F"
                    className="form-check-input"/>
                  <label
                    className="form-check-label ms-1 me-3"
                    htmlFor="F"
                  >
                    Friday
                  </label>
                </div>
                <div>
                  <input
                    checked={formData.A}
                    onChange={handleCheck}
                    type="checkbox"
                    name="A"
                    id="A"
                    className="form-check-input"/>
                  <label
                    className="form-check-label ms-1 me-3"
                    htmlFor="A"
                  >
                    Saturday
                  </label>
                </div>
              </div>
        </>
    )
}
