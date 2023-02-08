import axios from "axios";
import './Pireps.css'
import { useEffect, useState } from "react"
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import PirepService from "../services/PirepService";
import paginationFactory from 'react-bootstrap-table2-paginator';
// import DateTimePicker from 'react-datetime-picker';
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import { format, compareAsc } from 'date-fns'

import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';


function Pireps(props) {

    const [code, setCode] = useState("");
    const [distance, setDistance] = useState("");
    const [startDateTime, setStartDateTime] = useState("");
    const [endDateTime, setEndDateTime] = useState("");
    const [result, setResult] = useState([]);

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        // event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        if (form.checkValidity() === true) {
            event.preventDefault();
            setResult(getPirepData)
        }

        // setResult(getPirepData)
        setValidated(true);
    };
    const clear = () => {
        setCode("");
        setDistance("");
        setEndDateTime("");
        setStartDateTime("");
        setResult([]);
    };
    // useEffect(() => {
    //     getPirepData();
    // }, []);

    const onChangeEndDate = (e) => {
        var str = format(new Date(e.target.value), "yyyy-MM-ddTHH:mm:SS.sss");
        console.log(str);
        setEndDateTime(e.target.value);
    }

    const getPirepData = () => {
        const url = 'http://localhost:8080/pirep/';
        axios.get(url + code + "?startTime=" + startDateTime?.toISOString() + "&endTime=" + endDateTime?.toISOString())

            // setResult(PirepService.getPirepData(code))
            .then(response => {
                console.log(response.data);
                setResult(response.data)
                response.data.forEach((obj, index) => { obj.__id = index + 1 });
            })
            .catch(e => {
                console.log(e);
            });
    };

    const selectRow = {
        mode: "checkbox",
        selected: [1],
    };

    const columns = [
        {
            dataField: "__id",
            text: "ID",
            sort: true
        },
        {
            dataField: "raw_text",
            text: "Raw Text",
            sort: true
        },
        {
            dataField: "aircraft_ref",
            text: "AirCraft ref",
            sort: true
        },
        {
            dataField: "report_type",
            text: "Report Type",
            sort: true
        }
    ];

    return (
        <>
            <Container>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="3" controlId="validationCustom01">
                            <Form.Label>Location ID</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Location ID"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                Please Select a Location.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="3" controlId="validationCustom02">
                            <Form.Label>Start DateTime</Form.Label>
                            {/* <Form.Control
                                // required
                                type="Date"
                                placeholder="Start DateTime"
                                value={startDateTime}
                                onChange={(e) => setStartDateTime(e.target.value)}
                            /> */}

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    renderInput={(params) => <TextField {...params} />}
                                    value={startDateTime}
                                    onChange={(newValue) => {
                                        setStartDateTime(newValue);
                                    }}
                                    inputFormat="YYYY-MM-DD hh:mm a"
                                />
                            </LocalizationProvider>
                            {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                Please Select a Start DateTime.
                            </Form.Control.Feedback> */}
                        </Form.Group>
                        <Form.Group as={Col} md="3" controlId="validationCustom03">
                            <Form.Label>End DateTime</Form.Label>

                            {/* <DateTimePicker
                                onChange={setEndDateTime}
                                value={endDateTime} /> */}

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    renderInput={(params) => <TextField {...params} />}
                                    value={endDateTime}
                                    onChange={(newValue) => {
                                        setEndDateTime(newValue);
                                    }}
                                    inputFormat="YYYY-MM-DD hh:mm a"
                                />
                            </LocalizationProvider>
                            {/* <Form.Control
                                type="Date"
                                placeholder="End DateTime"
                                // required
                                value={endDateTime}
                                onChange={onChangeEndDate}
                            /> */}
                            {/* <Form.Control.Feedback type="invalid">
                                Please Select a End DateTime.
                            </Form.Control.Feedback> */}
                        </Form.Group>
                    </Row>
                    <div className="mb-3">
                        <Button type="submit">Get Data</Button>{' '}{' '}
                        <Button variant="secondary" onClick={clear}>Clear</Button>
                    </div>
                </Form>
            </Container>

            <div>
                <div />
                <div />
                <div />
                <Container>
                    {
                        result && result?.length > 0 && <BootstrapTable
                            keyField="__id"
                            data={result}
                            columns={columns}
                            striped
                            hover
                            condensed
                            pagination={paginationFactory()}
                            // selectRow={selectRow}
                            filter={filterFactory()}
                        />
                    }
                </Container>
            </div>
        </>
    )

}

export default Pireps;