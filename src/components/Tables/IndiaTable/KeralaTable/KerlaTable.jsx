import '../../Table.css'
import React, { useRef,useEffect ,useState } from 'react';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import TablePagination from '@mui/material/TablePagination';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { CSVLink } from 'react-csv';
import 'jspdf-autotable';
import { Line } from 'react-chartjs-2'; 
import { BiShareAlt } from 'react-icons/bi';
import { Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdSend } from 'react-icons/md';
// import { Link } from '@mui/material';
import { Link } from 'react-router-dom';


function prepareCSVData(rows, columns) {
    const data = [columns.map(column => column.label)];
    
    rows.forEach(row => {
      const rowData = columns.map(column => row[column.id]);
      data.push(rowData);
    });
    
    return data;
  }
function createData(name, code, population, size) {
    const density = population / size;
    return { name, code, population, size, density };
  }

const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  
  {
    id: 'density',
    label: 'Density',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },

];

const rows = [
    createData('Malappuram', 'MLP', 1324171354, 3287263),
    createData('Kozhikkode', 'KOK', 1403500365, 9596961),
    createData('Karnnur', 'KAN', 60483973, 301340),
    createData('Idukki', 'IDK', 327167434, 9833520),
    createData('Thrissur', 'THR', 37602103, 9984670),
    createData('Waynad', 'WYD', 25475400, 7692024),
    createData('Palakkad', 'PLK', 83019200, 357578),
];

export default function KeralaTable() {


  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [showTable, setShowTable] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [tableImage, setTableImage] = useState(null);

  const handleShare = () => {
    html2canvas(document.querySelector("#tablemaindiv")).then((canvas) => {
      setTableImage(canvas.toDataURL("image/png"));
      setShowModal(true);
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setTableImage(null);
  };

  const handleSend = () => {  
    // Implement your sharing logic here
    console.log('Sharing table image:', tableImage);
    handleCloseModal();
  };
  const downloadPDF = () => {
    const pdf = new jsPDF();
  
    // Define the columns for jspdf-autotable
    const pdfColumns = columns.map(column => column.label);
  
    // Define the rows for jspdf-autotable
    const pdfRows = rows.map(row => columns.map(column => row[column.id]));
  
    // Add the table heading to the top of the body
    const pdfBody = [pdfColumns, ...pdfRows];
  
    pdf.autoTable({
      head: [pdfColumns], // Pass the array of column labels as a single row
      body: pdfRows,
    });
  
    pdf.save('table_data.pdf');
  };
  const handleGraphButtonClick = () => {
    setShowTable(!showTable); // Toggle between table and graph view
  };
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const tableContainerRef = useRef(null);


  const handleWheelScroll = (event) => {
    const { deltaY } = event;
    const scrollStep = 50; // Adjust this value for the scroll speed
    const tableContainer = tableContainerRef.current;

    if (tableContainer) {
      tableContainer.scrollLeft += deltaY > 0 ? scrollStep : -scrollStep;
      event.preventDefault();
    }
  };

  // useEffect(() => {
  //   const handleWindowWheel = (event) => {
  //     if (tableContainerRef.current.contains(event.target)) {
  //       // If the wheel event is inside the TableContainer, prevent default
  //       event.preventDefault();
  //     }
  //   };

  //   // Add the event listener to disable main screen scrolling
  //   window.addEventListener('wheel', handleWindowWheel, { passive: false });

  //   return () => {
  //     // Clean up the event listener when the component unmounts
  //     window.removeEventListener('wheel', handleWindowWheel);
  //   };
  // }, []);

  
  return (
    <div>
  
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0px',marginRight:'24px' }}>
        <div style={{ marginRight: '10px' }}>
          <Button variant="contained" color="primary" onClick={downloadPDF} id="btnDownloadPdf">
          <i class="bi bi-filetype-pdf" style={{ fontSize:'1.5rem', paddingRight:'10px'}}></i> PDF
          </Button>
        </div>
        <div>
          <CSVLink
            data={prepareCSVData(rows, columns)}
            filename="table_data.csv"
          >
            <Button variant="contained" color="primary" id="btnDownloadCsv">
            <i class="bi bi-filetype-csv" style={{ fontSize:'1.5rem' ,paddingRight:'10px'}}></i>  CSV
            </Button>
          </CSVLink>
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Share Table</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {tableImage ? (
            <div>
              <img src={tableImage} alt="Table" />
            </div>
          ) : (
            <p>Generating table image...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          {tableImage && (
            <Button variant="primary" onClick={handleSend}>
              <MdSend /> Send
            </Button>
          )}
        </Modal.Footer>
      </Modal>
      <Paper sx={{ width: '95%', overflow: 'hidden' }} id='tablemaindiv' >
      <TableContainer sx={{ maxHeight: 'auto' }} id='table-scrollbar' ref={tableContainerRef}
        onWheel={handleWheelScroll}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead >
            <TableRow >
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  id='TableHead'
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {rows
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((row) => (
      <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
        {columns.map((column) => {
          const value = row[column.id];
          return (
            <TableCell key={column.id} align={column.align} id='TableData'>
              {/* Check if it's the "Name" column and render a link */}
              {column.id === 'name' ? (
                <Link style={{ textDecoration:'none' }} to={`/details/${row.code}`}>{value}</Link>
              ) : (
                column.format && typeof value === 'number'
                  ? column.format(value)
                  : value
              )}
            </TableCell>
          );
        })}
        </TableRow>
         ))}
        </Table>
      </TableContainer>
    </Paper>
    </div>
    
  );
}
