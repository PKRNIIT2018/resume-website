import jsPDF from 'jspdf';
import { resumeData } from '../data/resumeData';

export function generateDynamicResumePDF() {
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });

    const margin = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const maxWidth = pageWidth - (margin * 2);
    let y = margin;

    // Helper for adding text with auto page breaks
    const addText = (text: string, fontSize: number, style: 'normal' | 'bold' | 'italic' = 'normal', color: [number, number, number] = [0, 0, 0], marginBottom: number = 5) => {
        doc.setFontSize(fontSize);
        doc.setFont('helvetica', style);
        doc.setTextColor(color[0], color[1], color[2]);

        const lines = doc.splitTextToSize(text, maxWidth);
        if (y + (lines.length * (fontSize / 2.8)) > pageHeight - margin) {
            doc.addPage();
            y = margin;
        }

        doc.text(lines, margin, y);
        y += (lines.length * (fontSize / 2.8)) + marginBottom;
    };

    // Header
    addText(resumeData.personalInfo.name, 22, 'bold', [0, 102, 204], 2);
    addText(resumeData.personalInfo.title, 14, 'bold', [100, 100, 100], 4);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    const contactInfo = `${resumeData.personalInfo.location} | ${resumeData.personalInfo.email} | ${resumeData.personalInfo.phone}`;
    doc.text(contactInfo, margin, y);
    y += 5;
    doc.text(resumeData.personalInfo.linkedin, margin, y);
    y += 8;

    // Horizontal Line
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, y, pageWidth - margin, y);
    y += 8;

    // Executive Summary
    addText('EXECUTIVE SUMMARY', 14, 'bold', [0, 102, 204], 4);
    addText(resumeData.executiveSummary.replace(/\*\*/g, ''), 10, 'normal', [0, 0, 0], 8);

    // Core Competencies
    addText('CORE COMPETENCIES', 14, 'bold', [0, 102, 204], 4);
    resumeData.skills.forEach(cat => {
        addText(cat.category, 11, 'bold', [50, 50, 50], 2);
        addText(cat.items.join(' • '), 10, 'normal', [0, 0, 0], 5);
    });
    y += 3;

    // Professional Experience
    addText('PROFESSIONAL EXPERIENCE', 14, 'bold', [0, 102, 204], 6);
    resumeData.experience.forEach(exp => {
        // Role and Date
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0, 0, 0);
        doc.text(exp.role, margin, y);
        doc.setFont('helvetica', 'normal');
        const dateWidth = doc.getTextWidth(exp.period);
        doc.text(exp.period, pageWidth - margin - dateWidth, y);
        y += 6;

        // Company and Location
        addText(`${exp.company} | ${exp.location}`, 11, 'italic', [0, 102, 204], 4);

        if (exp.description) {
            addText(exp.description.replace(/\*\*/g, ''), 10, 'normal', [0, 0, 0], 4);
        }

        exp.achievements.forEach(ach => {
            if (typeof ach === 'string') {
                doc.setFontSize(10);
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(0, 0, 0);
                const bulletText = doc.splitTextToSize(ach.replace(/\*\*/g, ''), maxWidth - 5);
                if (y + (bulletText.length * 4) > pageHeight - margin) {
                    doc.addPage();
                    y = margin;
                }
                doc.text('•', margin, y);
                doc.text(bulletText, margin + 5, y);
                y += (bulletText.length * 4) + 2;
            } else {
                // Nested AI highlight
                y += 2;
                addText(ach.title, 10, 'bold', [0, 0, 0], 3);
                ach.items.forEach(item => {
                    doc.setFontSize(10);
                    doc.setFont('helvetica', 'normal');
                    const itemText = doc.splitTextToSize(item.replace(/\*\*/g, ''), maxWidth - 10);
                    if (y + (itemText.length * 4) > pageHeight - margin) {
                        doc.addPage();
                        y = margin;
                    }
                    doc.text('-', margin + 5, y);
                    doc.text(itemText, margin + 10, y);
                    y += (itemText.length * 4) + 2;
                });
            }
        });
        y += 4;
    });

    // Education
    addText('EDUCATION', 14, 'bold', [0, 102, 204], 4);
    resumeData.education.forEach(edu => {
        addText(`${edu.degree} - ${edu.institution} (${edu.year})`, 11, 'normal', [0, 0, 0], 4);
    });
    y += 4;

    // Certifications
    addText('LICENSES & CERTIFICATIONS', 14, 'bold', [0, 102, 204], 4);
    resumeData.certifications.forEach(cert => {
        addText(`• ${cert}`, 10, 'normal', [0, 0, 0], 2);
    });

    // Save the PDF
    doc.save(`Resume_${resumeData.personalInfo.name.replace(/\s+/g, '_')}.pdf`);
}
