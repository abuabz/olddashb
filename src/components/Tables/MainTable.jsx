import './Table.css'
import React, { useRef,useEffect ,useState } from 'react';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { CSVLink } from 'react-csv';
import 'jspdf-autotable';
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


function createData(name,  QTY_FTD,QTY_Tgt,QTY_MTD01,QTY_RTN,QTY_MTD02,QTY_Ach,QTY_BTD,QTY_DRR,QTY_LYMTD,QTY_Gwth01,QTY_LMTD,QTY_Gwth02
                            ,VAL_FTD,VAL_Tgt,VAL_MTD01,VAL_RTN,VAL_MTD02,VAL_Ach,VAL_BTD,VAL_DRR,VAL_LYMTD,VAL_Gwth01,VAL_LMTD,VAL_Gwth02) {
    return { name,  QTY_FTD,QTY_Tgt,QTY_MTD01,QTY_RTN,QTY_MTD02,QTY_Ach,QTY_BTD,QTY_DRR,QTY_LYMTD,QTY_Gwth01,QTY_LMTD,QTY_Gwth02
                    ,VAL_FTD,VAL_Tgt,VAL_MTD01,VAL_RTN,VAL_MTD02,VAL_Ach,VAL_BTD,VAL_DRR,VAL_LYMTD,VAL_Gwth01,VAL_LMTD,VAL_Gwth02};
  }

const columns = [
    { id: 'name', label: 'Name', minWidth: 250 },
  {
    id: 'QTY_FTD',
    label: 'FTD',
    minWidth: 70,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'QTY_Tgt',
    label: 'Tgt',
    minWidth: 70,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'QTY_MTD01',
    label: 'MTD',
    minWidth: 70,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  
  {
    id: 'QTY_RTN',
    label: 'RTN',
    minWidth: 70,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
    },
  {
    id: 'QTY_MTD02',
    label: 'MTD',
    minWidth: 70,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'QTY_Ach',
    label: 'Ach%',
    minWidth:70,
    align: 'right',
    format: (value) => {
      const formattedValue = (value).toFixed(2);
      return formattedValue.endsWith('.00') ? `${parseInt(formattedValue)}%` : `${formattedValue}%`;
    },
  },
  {
    id: 'QTY_BTD',
    label: 'BTD',
    minWidth: 70,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
    },
  {
    id: 'QTY_DRR',
    label: 'DRR',
    minWidth: 70,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
    },
  {
    id: 'QTY_LYMTD',
    label: 'LYMTD',
    minWidth: 70,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'QTY_Gwth01',
    label: 'Gwth%',
    minWidth: 70,
    align: 'right',
    format: (value) => {
      const formattedValue = (value).toFixed(2);
      return formattedValue.endsWith('.00') ? `${parseInt(formattedValue)}%` : `${formattedValue}%`;
    },
  },
  {
    id: 'QTY_LMTD',
    label: 'LMTD',
    minWidth: 70,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'QTY_Gwth02',
    label: 'Gwth%',
    minWidth: 70,
    align: 'right',
    format: (value) => {
      const formattedValue = (value).toFixed(2);
      return formattedValue.endsWith('.00') ? `${parseInt(formattedValue)}%` : `${formattedValue}%`;
    },
  },
    {
      id: 'VAL_FTD',
      label: 'FTD',
      minWidth: 70,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'VAL_Tgt',
      label: 'Tgt',
      minWidth: 70,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'VAL_MTD01',
      label: 'MTD',
      minWidth: 70,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'VAL_RTN',
      label: 'RTN',
      minWidth: 70,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'VAL_MTD02',
      label: 'MTD',
      minWidth: 70,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'VAL_Ach',
      label: 'Ach%',
      minWidth: 70,
      align: 'right',
      format: (value) => {
        const formattedValue = (value * 100).toFixed(2);
        return formattedValue.endsWith('.00') ? `${parseInt(formattedValue)}%` : `${formattedValue}%`;
      },
    },
    {
      id: 'VAL_BTD',
      label: 'BTD',
      minWidth: 70,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'VAL_DRR',
      label: 'DRR',
      minWidth: 70,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'VAL_LYMTD',
      label: 'LYMTD',
      minWidth: 70,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'VAL_Gwth01',
      label: 'Gwth%',
      minWidth: 70,
      align: 'right',
      format: (value) => {
        const formattedValue = (value * 100).toFixed(2);
        return formattedValue.endsWith('.00') ? `${parseInt(formattedValue)}%` : `${formattedValue}%`;
      },
    },
    {
      id: 'VAL_LMTD',
      label: 'LMTD',
      minWidth: 70,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'VAL_Gwth02',
      label: 'Gwth%',
      minWidth: 70,
      align: 'right',
      format: (value) => {
        const formattedValue = (value * 100).toFixed(2);
        return formattedValue.endsWith('.00') ? `${parseInt(formattedValue)}%` : `${formattedValue}%`;
      },
    },

];

const rows = [
    createData('RSM01', 1234, 1324, 3287, 1324, 3287, 9, 3287, 1324, 3287, 96, 3287,100, 1234, 1324, 3287, 1324, 3287, 9, 3287, 1324, 3287, 96, 3287,100),
    createData('RSM02',  1234, 1324, 3287, 1324, 3287, 9, 3287, 1324, 3287, 97, 3287,100, 1234, 1324, 3287, 1324, 3287, 9, 3287, 1324, 3287, 96, 3287,100),
    createData('RSM03',  1234, 1324, 3287, 1324, 3287, 9, 3287, 1324, 3287, 98, 3287,100, 1234, 1324, 3287, 1324, 3287, 9, 3287, 1324, 3287, 96, 3287,100),
    createData('RSM04',  1234, 1324, 3287, 1324, 3287, 9, 3287, 1324, 3287, 92, 3287,100, 1234, 1324, 3287, 1324, 3287, 9, 3287, 1324, 3287, 96, 3287,100 ),

];

export default function MainTable() {


  const [showQTYColumns, setShowQTYColumns] = useState(false);


  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [showTable, setShowTable] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [tableImage, setTableImage] = useState(null);
  const handleValueButtonClick = () => {
    setShowQTYColumns(!showQTYColumns);
  };
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
            filename="RSM_table.csv"
          >
            <Button variant="contained" color="primary" id="btnDownloadCsv">
            <i class="bi bi-filetype-csv" style={{ fontSize:'1.5rem' ,paddingRight:'10px'}}></i>  CSV
            </Button>
          </CSVLink>
        </div>
      
      </div>
      <Button variant="contained" color="primary" onClick={handleValueButtonClick}>
          Value
        </Button>

      <Paper sx={{ width: '95%', overflow: 'hidden' }} id='tablemaindiv' >
  <TableContainer sx={{ maxHeight: 'auto' }} id='table-scrollbar' ref={tableContainerRef}
    onWheel={handleWheelScroll}>
    <Table stickyHeader aria-label="sticky table">
      <TableHead>
        <TableRow>
          <TableCell id='TableHead' rowSpan={3}  style={{ fontSize:'2rem', fontFamily:'inherit', borderRight:'solid 1px' }}>
            RSM TABLE
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell id='TableHead' colSpan={columns.length/2} style={{ borderRight:'solid 1px' }}>
            Aug'23 Secondary
          </TableCell>
          {showQTYColumns && (
            <TableCell id='TableHead' colSpan={columns.length/2}>
              Aug'23 Secondary
            </TableCell>
          )}
        </TableRow>
        <TableRow>
          <TableCell id='TableHead' colSpan={columns.length/2} style={{ textAlign: 'center', fontWeight: 'bold', borderRight:'solid 1px' }}>
            QTY
          </TableCell>
          {showQTYColumns && (
            <TableCell colSpan={columns.length/2} id='TableHead'>
              VALUE
            </TableCell>
          )}
        </TableRow>
        <TableRow>
          {columns.map((column) => {
            if (showQTYColumns || !column.id.startsWith('QTY_')) {
              return (
                <TableCell
                  key={column.id} 
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  id='TableHead'
                >
                  {column.label}
                </TableCell>
              );
            }
            return null; // Don't render QTY columns when showQTYColumns is false
          })}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row) => (
            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
              {columns.map((column) => {
                if (showQTYColumns || !column.id.startsWith('QTY_')) {
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
                }
                return null; // Don't render QTY columns when showQTYColumns is false
              })}
            </TableRow>
          ))}
      </TableBody>
    </Table>
  </TableContainer>
</Paper>

    </div>
    
  );
}
