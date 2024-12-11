import { jsPDF } from "jspdf";
import moment from "moment";

export const exportIndividualPDF = (record) => {
  const doc = new jsPDF();
  doc.text(`Appointment Details`, 10, 10);
  doc.text(`Name: ${record.name}`, 10, 20);
  doc.text(`Email: ${record.email}`, 10, 30);
  doc.text(`Phone: ${record.phone}`, 10, 40);
  doc.text(`Address: ${record.address.combinedAddress} ${record.address.zipcode}`, 10, 50);
  doc.text(`Date: ${moment(record.requestDate).format("YYYY-MM-DD h:mm a")}`, 10, 60);
  doc.save(`${record.name}_appointment.pdf`);
};

export const exportListPDF = (list, day) => {
  const doc = new jsPDF();
  const pageHeight = doc.internal.pageSize.getHeight(); 
  const pageWidth = doc.internal.pageSize.getWidth();
  const lineHeight = 5;
  const margin = 10;
  const contentWidth = pageWidth - 2 * margin;

  let y = 16; 
  doc.setFontSize(14);
  doc.text(`Optimized Route Addresses for ${day}`, margin, y);
  y += 10;

  doc.setFontSize(10);
  doc.text("1. Los Angeles City Hall", margin, y);
  y += 10;

  list.forEach((address, index) => {
      if (index !== 0) {
          const details = `${index + 1}. ${address.name}, 
          Time: ${moment(address.date).format("h:mm a")}, 
          Address: ${address.address}, 
          Phone: ${address.phone}, 
          Email: ${address.email}`;
          const splitText = doc.splitTextToSize(details, contentWidth);

          splitText.forEach((line) => {
              if (y + lineHeight > pageHeight - margin) {
                  doc.addPage(); 
                  y = margin;
              }
              doc.text(line, margin, y);
              y += lineHeight;
          });

          y += 4;
      }
  });

  doc.save("optimized_route.pdf");
};