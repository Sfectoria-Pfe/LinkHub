import React, { useState, useEffect } from "react";


import axios from "axios";
import { Card, CardContent, Typography, Grid} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom"; // Import useParams and useNavigate hooks

import MainMessages from "../../messages/components/MainMessages";

import Accordion from "react-bootstrap/Accordion";
import ListGroup from "react-bootstrap/ListGroup";

import { MdOutlineRemoveRedEye } from "react-icons/md";
import { GoDownload } from "react-icons/go";
import { pdfjs } from 'react-pdf';


// Configure PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();
pdfjs.GlobalWorkerOptions.standardFontDataUrl = '/path/to/standard/fonts';



const CoursAtachment = () => {

  //pdf


  const { categoryId } = useParams(); // Get categoryId from URL parameters
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState();
  const [allImage, setAllImage] = useState([]); // Initialize allImage state variable as an empty array [
  const navigate = useNavigate(); // Initialize useNavigate hook

 

  const getPdf = async () => {
    try {
      const result = await axios.get(`http://localhost:3000/api/courses/get-files/${courseId}`);
      setAllImage(result.data.data);
    } catch (error) {
      console.error("Error fetching PDF files:", error);
    }
  };
  useEffect(() => {
    getPdf();
  }, [courseId]);


  const showPdf = (file) => {
    const absoluteFilePath = `http://localhost:3000/api/courses/get-files/${file}`;
    const pdfWindow = window.open();
    pdfjs.getDocument(absoluteFilePath).promise.then(pdf => {
      const numPages = pdf.numPages;
      const pagesPromises = Array.from({ length: numPages }, (_, i) =>
        pdf.getPage(i + 1).then(page => {
          const scale = 1.5;
          const viewport = page.getViewport({ scale });
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          const renderContext = {
            canvasContext: context,
            viewport: viewport
          };
          return page.render(renderContext).promise.then(() => canvas);
        })
      );
      Promise.all(pagesPromises).then(pages => {
        pages.forEach(canvas => {
          pdfWindow.document.body.appendChild(canvas);
        });
      });
    });
  }


  const downloadPdf = (file) => {
    const link = document.createElement("a");
    link.href = `http://localhost:3000/api/courses/get-files/${file}`;
    link.download = file;
    link.click();
  };

  const getAllCoursesInCategory = async (categoryId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/categories/getAllCoursesInCategory/${categoryId}`
      );
      setCourses(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching courses in category:", error);
    }
  };
  useEffect(() => {
    getAllCoursesInCategory(categoryId);
  }, [categoryId]);
  
  const handleButtonClick = (courseId) => {
    navigate(`/readCourse/student/${courseId}`); // Navigate to the specified route with the courseId
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Tous les cours
      </Typography>
      <div className="p-4 position-relative" >
     
      <Accordion defaultActiveKey={["0"]} className="w-75" alwaysOpen style={{paddingRight:"30px"}}>
        {courses.map((course, i) => {
          return (
            <div className="mt-4" key={i}>
              <Accordion.Item eventKey={i + ""} onClick={()=>setCourseId(course._id)}>
                <Accordion.Header>{course?.name}</Accordion.Header>
                <Accordion.Body>
                  <ListGroup>
                    <ListGroup.Item action>
                    <ListGroup>
                              { 
                              allImage?.map(e=>

                                <ListGroup.Item
                                 
                                >
                                  <i
                                    class="fa-regular fa-file-lines"
                                    style={{
                                      paddingLeft: "10px",
                                      paddingRight: "10px",
                                    }}
                                  ></i>
                                  {e.name}.pdf <div style={{ float: 'right' }}>
                                    <MdOutlineRemoveRedEye onClick={() => showPdf(e.file)} style={{ marginRight: '10px' }} />
                                    <GoDownload onClick={() => downloadPdf(e.file)} />
                                  </div>
                                </ListGroup.Item>
                               )
                                }
                              
                              </ListGroup>
                    </ListGroup.Item>
                  </ListGroup>
                </Accordion.Body>
              </Accordion.Item>
            </div>
          );
        })}
      </Accordion>
      <div className="top-0 py-5 position-fixed w-md-100 w-25 h-100"  style={{ right: 0 ,display:""}}>
        <MainMessages categoryId={categoryId}/>
      </div>
    </div>
   </div>
  );
};

export default CoursAtachment;
