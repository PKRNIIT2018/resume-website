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

    // Constants for IBM-brand feel and ATS optimization
    const FONT_BODY = 'helvetica';
    const SIZE_HEADER = 14;
    const SIZE_SUBHEADER = 12;
    const SIZE_BODY = 11;

    // Helper for adding text with auto page breaks
    const addText = (text: string, fontSize: number, style: 'normal' | 'bold' | 'italic' = 'normal', color: [number, number, number] = [0, 0, 0], marginBottom: number = 4) => {
        doc.setFontSize(fontSize);
        doc.setFont(FONT_BODY, style);
        doc.setTextColor(color[0], color[1], color[2]);

        const lines = doc.splitTextToSize(text, maxWidth);
        if (y + (lines.length * (fontSize / 2.8)) > pageHeight - margin) {
            doc.addPage();
            y = margin;
        }

        doc.text(lines, margin, y);
        y += (lines.length * (fontSize / 2.8)) + marginBottom;
    };

    // Header - Name
    addText(resumeData.personalInfo.name, 22, 'bold', [0, 0, 0], 2);

    // Title & Subtitle
    addText(resumeData.personalInfo.title, SIZE_HEADER, 'bold', [100, 100, 100], 4);

    // Contact Info - Clean Vertical Flow
    doc.setFontSize(SIZE_BODY);
    doc.setFont(FONT_BODY, 'normal');
    doc.setTextColor(80, 80, 80);
    addText(`${resumeData.personalInfo.location} | ${resumeData.personalInfo.email}`, SIZE_BODY, 'normal', [80, 80, 80], 2);
    addText(`${resumeData.personalInfo.phone} | ${resumeData.personalInfo.linkedin}`, SIZE_BODY, 'normal', [80, 80, 80], 6);

    // Horizontal Line
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, y, pageWidth - margin, y);
    y += 8;

    // Executive Summary
    addText('EXECUTIVE SUMMARY', SIZE_HEADER, 'bold', [0, 102, 204], 4);
    addText(resumeData.executiveSummary.replace(/\*\*/g, ''), SIZE_BODY, 'normal', [0, 0, 0], 8);

    // Core Competencies
    addText('CORE COMPETENCIES', SIZE_HEADER, 'bold', [0, 102, 204], 4);
    resumeData.skills.forEach(cat => {
        addText(cat.category, SIZE_SUBHEADER, 'bold', [50, 50, 50], 2);
        addText(cat.items.join(' • '), SIZE_BODY, 'normal', [0, 0, 0], 6);
    });
    y += 2;

    // Professional Experience
    addText('PROFESSIONAL EXPERIENCE', SIZE_HEADER, 'bold', [0, 102, 204], 6);
    resumeData.experience.forEach(exp => {
        // Role
        addText(exp.role, SIZE_SUBHEADER, 'bold', [0, 0, 0], 1);
        // Company and Location
        addText(`${exp.company} | ${exp.location} | ${exp.period}`, SIZE_BODY, 'bold', [0, 102, 204], 4);

        if (exp.description) {
            addText(exp.description.replace(/\*\*/g, ''), SIZE_BODY, 'normal', [0, 0, 0], 4);
        }

        exp.achievements.forEach(ach => {
            if (typeof ach === 'string') {
                doc.setFontSize(SIZE_BODY);
                doc.setFont(FONT_BODY, 'normal');
                doc.setTextColor(0, 0, 0);
                const bulletText = doc.splitTextToSize(ach.replace(/\*\*/g, ''), maxWidth - 5);
                if (y + (bulletText.length * 5) > pageHeight - margin) {
                    doc.addPage();
                    y = margin;
                }
                doc.text('•', margin, y);
                doc.text(bulletText, margin + 5, y);
                y += (bulletText.length * 5) + 2;
            } else {
                // Nested AI highlight
                y += 2;
                addText(ach.title, SIZE_BODY, 'bold', [0, 0, 0], 3);
                ach.items.forEach(item => {
                    doc.setFontSize(SIZE_BODY);
                    doc.setFont(FONT_BODY, 'normal');
                    const itemText = doc.splitTextToSize(item.replace(/\*\*/g, ''), maxWidth - 10);
                    if (y + (itemText.length * 5) > pageHeight - margin) {
                        doc.addPage();
                        y = margin;
                    }
                    doc.text('-', margin + 5, y);
                    doc.text(itemText, margin + 10, y);
                    y += (itemText.length * 5) + 2;
                });
            }
        });
        y += 4;
    });

    // Education
    addText('EDUCATION', SIZE_HEADER, 'bold', [0, 102, 204], 4);
    resumeData.education.forEach(edu => {
        addText(`${edu.degree} - ${edu.institution} (${edu.year})`, SIZE_BODY, 'normal', [0, 0, 0], 4);
    });
    y += 4;

    // Certifications
    addText('LICENSES & CERTIFICATIONS', SIZE_HEADER, 'bold', [0, 102, 204], 4);
    resumeData.certifications.forEach(cert => {
        addText(`• ${cert}`, SIZE_BODY, 'normal', [0, 0, 0], 2);
    });

    // Save the PDF
    doc.save(`Resume_${resumeData.personalInfo.name.replace(/\s+/g, '_')}.pdf`);
}
