
const puppeteer = require('puppeteer');

const createInvoiceService = async (data) => {
    console.log('starting')
    const { assignment_topic, course_title, course_code, student_name, student_id, student_year, student_semester, student_session, student_department, teacher_name, teacher_position, teacher_department, teacher_university, submission_date } = data;
    const imageUrl = `http://localhost:3000/images/logo/bsmrstu.jpg`;
    const launchOptions = {
        args: ['--no-sandbox'],
        headless: "new"
    };

    const browser = await puppeteer.launch(launchOptions);
    // const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    const htmlContent =
        `<html>
            <head>            
                <style>
                    body {
                        margin: 70px;
                        font-family: 'Times New Roman', Times, serif;
                    }
            
                    table {
                        border-collapse: collapse;
                        width: 100%;
                        table-layout: fixed;
                        /* Add this line to fix the column widths */
                    }
            
                    thead tr {
                        background-color: #2d7136;
                        color: white;
                        font-size: 24px;
                    }
            
                    td,
                    th {
                        border: 1px solid #dddddd;
                        padding: 8px;
                    }
            
                    tr:nth-child(even) {
                        background-color: #dddddd;
                    }
            
                    tr div {
                        font-size: 24px;
                        margin: 5px 10px;
                    }
                </style>

            </head>

            <body>
                <h1 style="text-align: center; color: #2d7136;">BANGABANDHU SHEIKH MUJIBUR RAHMAN SCIENCE
                    <br>
                    &
                    <br>
                    TECHNOLOGY UNIVERSITY
                </h1>
                <br />
                <div style='display: flex; justify-content: center; align-items: center'>
                    <img style='height: 150px;' src=${imageUrl} alt="bsmrstu logo">
                </div>
                <h3 style="text-align: center; color: #2d7136;">GOPALGANJ-8100</h3>
                <br />
                <hr>
                <br />
                <h3 style="text-align: center;">Assignment on</h3>
                <h2 style="text-align: center;"> ${assignment_topic} </h2>
                <br />
                <h2>Course Title: <span style="font-weight: lighter;">${course_title}</span></h2>
                <h2>Course Code: <span style="font-weight: lighter;">${course_code}</span></h2>
                <br />
                <table>
                    <thead>
                        <tr>
                            <th>Submitted By</th>
                            <th>Submitted To</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div><strong>Name: </strong> ${student_name} </div>
                                <div><strong>Student Id: </strong>  ${student_id} </div>
                                <div><strong>Year: </strong> ${student_year} </div>
                                <div><strong>Semester: </strong> ${student_year} </div>
                                <div><strong>Session: </strong> ${student_semester} </div>
                                <div>Department of ${student_department}</div>
                                <div>Bangabandhu Sheikh Mujibur Rahman
                                    Science & Technology University,
                                    <br>
                                    Gopalganj-8100
                                </div>
                            </td>
                            <td>
                                <div><strong>Name: </strong> ${teacher_name} </div>
                                <div> ${teacher_position} </div>
                                <br>
                                <br>
                                <div>Department of ${teacher_department} </div>
                                <div> ${teacher_university} </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <br>
                <div style="font-size: 20px;">Date of Submission: ${submission_date} </div>
            </body>
        </html>`
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    const buffer = await page.pdf({
        format: 'A4',
        margin: {
            top: '20px',
            right: '20px',
            bottom: '20px',
            left: '20px'
        },
        scale: 0.8, // Adjust this value as needed
        printBackground: true,
    });
    await browser.close();

    return { buffer, htmlContent }
}





exports.getAssignmentCover = async (req, res, next) => {
    try {
        const result = await createInvoiceService(req.body);
        res.status(200).json({
            status: 'success',
            message: 'successfully created psf',
            data: result, // Return the job ID for later reference
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: 'failed',
            message: error?.message,
            data: error
        })
    }
}