import React, { useState, useEffect } from 'react';
import { useTranslation } from '../i18n';
import { motion, AnimatePresence } from 'framer-motion';

// --- CONSTANTS ---
const WHATSAPP_NUMBER = '31612345678'; // Placeholder number
const EMAIL_ADDRESS = 'info@ella-personnel.nl';

// --- ICONS ---
const WhatsAppIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.003 2.011.564 3.996 1.713 5.662l-1.072 3.913 3.94-1.045z"/></svg>;
const EmailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>;

// Reusable component for form inputs
const FormInput = ({ id, label, placeholder, type = 'text', value, onChange, error, hint, required = false }: { id: any; label: any; placeholder: any; type?: string; value: any; onChange: any; error: any; hint?: any; required?: boolean; }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-semibold text-gray-300 mb-2">
            {label}{required && <span className="text-red-400"> *</span>}
        </label>
        <input
            type={type}
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className={`w-full bg-gray-800/50 border ${error ? 'border-red-500' : 'border-blue-500/30'} rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${error ? 'focus:ring-red-500' : 'focus:ring-blue-400'} transition-all`}
        />
        {hint && !error && <p className="mt-1 text-xs text-gray-400">{hint}</p>}
        {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
);

// Reusable component for textareas
const FormTextarea = ({ id, label, placeholder, value, onChange, error, hint, required = false }: { id: any; label: any; placeholder: any; value: any; onChange: any; error: any; hint?: any; required?: boolean; }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-semibold text-gray-300 mb-2">
            {label}{required && <span className="text-red-400"> *</span>}
        </label>
        <textarea
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={5}
            required={required}
            className={`w-full bg-gray-800/50 border ${error ? 'border-red-500' : 'border-blue-500/30'} rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${error ? 'focus:ring-red-500' : 'focus:ring-blue-400'} transition-all resize-vertical`}
        />
        {hint && !error && <p className="mt-1 text-xs text-gray-400">{hint}</p>}
        {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
);

// Type for main form errors
interface FormErrors {
    name?: string;
    companyName?: string;
    email?: string;
    confirmEmail?: string;
    phoneNumber?: string;
    address?: string;
    projectType?: string;
    startDate?: string;
    endDate?: string;
    equipment?: string;
    requests?: string;
    privacy?: string;
}

// Type for callback form errors
interface CallbackFormErrors {
    callbackName?: string;
    callbackCompanyName?: string;
    callbackPhoneNumber?: string;
}

// Type for consultation form errors
interface ConsultationFormErrors {
    fullName?: string;
    email?: string;
    phone?: string;
    topic?: string;
    otherTopic?: string;
    description?: string;
}

// Type for tax return form errors
interface TaxReturnFormErrors {
    fullName?: string;
    email?: string;
    phone?: string;
    taxYear?: string;
}

// Type for healthcare application form errors
interface HealthcareFormErrors {
    fullName?: string;
    email?: string;
    phone?: string;
    specialization?: string;
    experience?: string;
    availability?: string;
    cv?: string;
}


type ActiveTab = 'quote' | 'consultation' | 'callback' | 'tax' | 'healthcareApply';
const validTabs: ActiveTab[] = ['quote', 'consultation', 'callback', 'tax', 'healthcareApply'];

interface ContactPageProps {
  initialTab?: string;
}

const ContactPage: React.FC<ContactPageProps> = ({ initialTab = 'quote' }) => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState<ActiveTab>(
      validTabs.includes(initialTab as ActiveTab) ? initialTab as ActiveTab : 'quote'
    );
    
    useEffect(() => {
        if (initialTab && validTabs.includes(initialTab as ActiveTab)) {
            setActiveTab(initialTab as ActiveTab);
        }
    }, [initialTab]);

    // State for main form
    const [formData, setFormData] = useState({
        name: '', companyName: '', email: '', confirmEmail: '', phoneNumber: '',
        address: '', projectType: '', startDate: '', endDate: '', equipment: '',
        requests: '', privacy: false,
    });
    const [errors, setErrors] = useState<FormErrors>({});

    // State for callback form
    const [callbackData, setCallbackData] = useState({
        callbackName: '', callbackCompanyName: '', callbackPhoneNumber: '',
    });
    const [callbackErrors, setCallbackErrors] = useState<CallbackFormErrors>({});

    // State for consultation form
    const [consultationData, setConsultationData] = useState({
        fullName: '', email: '', phone: '', wantsWhatsApp: false, topic: '',
        otherTopic: '', description: '', attachment: null as File | null,
    });
    const [consultationErrors, setConsultationErrors] = useState<ConsultationFormErrors>({});
    const [fileName, setFileName] = useState('');

    // State for tax return form
    const [taxReturnData, setTaxReturnData] = useState({
        fullName: '',
        bsn: '',
        email: '',
        phone: '',
        taxYear: '',
        files: [] as File[],
        jointReturn: false,
    });
    const [taxReturnErrors, setTaxReturnErrors] = useState<TaxReturnFormErrors>({});

    // State for healthcare application form
    const [healthcareData, setHealthcareData] = useState({
        fullName: '',
        email: '',
        phone: '',
        specialization: '',
        experience: '',
        availability: '',
        cv: null as File | null,
        message: '',
    });
    const [healthcareErrors, setHealthcareErrors] = useState<HealthcareFormErrors>({});
    const [cvFileName, setCvFileName] = useState('');


    // --- HANDLERS FOR MAIN FORM ---
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const validateForm = () => {
        const newErrors: FormErrors = {};
        if (!formData.name) newErrors.name = 'validation.name.required';
        if (!formData.companyName) newErrors.companyName = 'validation.companyName.required';
        if (formData.companyName.length > 100) newErrors.companyName = 'validation.companyName.limit';
        if (!formData.email) newErrors.email = 'validation.email.required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'validation.email.invalid';
        if (formData.email !== formData.confirmEmail) newErrors.confirmEmail = 'validation.email.mismatch';
        if (!formData.phoneNumber) newErrors.phoneNumber = 'validation.phone.required';
        if (!formData.address) newErrors.address = 'validation.address.required';
        if (formData.address.length > 100) newErrors.address = 'validation.address.limit';
        if (!formData.projectType) newErrors.projectType = 'validation.projectType.required';
        if (!formData.startDate) newErrors.startDate = 'validation.startDate.required';
        if (!formData.endDate) newErrors.endDate = 'validation.endDate.required';
        if (!formData.equipment) newErrors.equipment = 'validation.equipment.required';
        if (formData.equipment.length > 500) newErrors.equipment = 'validation.equipment.limit';
        if (formData.requests.split(/\s+/).filter(s => s).length > 500) newErrors.requests = 'validation.requests.limit';
        if (!formData.privacy) newErrors.privacy = 'validation.privacy.required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleQuoteSubmit = (method: 'whatsapp' | 'email') => {
        if (validateForm()) {
            const subject = `${t('contact.tabs.quote')} - ${formData.name}`;
            let body = `*${t('contact.tabs.quote')}*\n\n`;
            body += `*${t('contact.form.name')}:* ${formData.name}\n`;
            body += `*${t('contact.form.companyName')}:* ${formData.companyName}\n`;
            body += `*${t('contact.form.email')}:* ${formData.email}\n`;
            body += `*${t('contact.form.phone')}:* ${formData.phoneNumber}\n`;
            body += `*${t('contact.form.address')}:* ${formData.address}\n`;
            body += `*${t('contact.form.projectType')}:* ${formData.projectType}\n`;
            body += `*${t('contact.form.startDate')}:* ${formData.startDate}\n`;
            body += `*${t('contact.form.endDate')}:* ${formData.endDate}\n`;
            body += `*${t('contact.form.equipment')}:*\n${formData.equipment}\n`;
            if (formData.requests) {
                body += `*${t('contact.form.requests')}:*\n${formData.requests}\n`;
            }

            if (method === 'whatsapp') {
                const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(body)}`;
                window.open(whatsappUrl, '_blank');
                alert(t('contact.form.whatsappSuccess'));
            } else { // email
                const mailtoUrl = `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body.replace(/\*/g, ''))}`;
                window.location.href = mailtoUrl;
                alert(t('contact.form.emailSuccess'));
            }
        }
    };

    // --- HANDLERS FOR CALLBACK FORM ---
    const handleCallbackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCallbackData(prev => ({ ...prev, [name]: value }));
        if (callbackErrors[name as keyof CallbackFormErrors]) {
            setCallbackErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const validateCallbackForm = () => {
        const newErrors: CallbackFormErrors = {};
        if (!callbackData.callbackName) newErrors.callbackName = 'validation.name.required';
        if (!callbackData.callbackCompanyName) newErrors.callbackCompanyName = 'validation.companyName.required';
        if (!callbackData.callbackPhoneNumber) newErrors.callbackPhoneNumber = 'validation.phone.required';
        setCallbackErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleCallbackSubmit = (method: 'whatsapp' | 'email') => {
        if (validateCallbackForm()) {
            const subject = `${t('contact.tabs.callback')} - ${callbackData.callbackName}`;
            let body = `*${t('contact.tabs.callback')}*\n\n`;
            body += `*${t('contact.form.name')}:* ${callbackData.callbackName}\n`;
            body += `*${t('contact.form.companyName')}:* ${callbackData.callbackCompanyName}\n`;
            body += `*${t('contact.form.phone')}:* ${callbackData.callbackPhoneNumber}\n`;

            if (method === 'whatsapp') {
                const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(body)}`;
                window.open(whatsappUrl, '_blank');
                alert(t('contact.form.whatsappSuccess'));
            } else { // email
                const mailtoUrl = `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body.replace(/\*/g, ''))}`;
                window.location.href = mailtoUrl;
                alert(t('contact.form.emailSuccess'));
            }
            setCallbackData({ callbackName: '', callbackCompanyName: '', callbackPhoneNumber: '' });
        }
    };

    // --- HANDLERS FOR CONSULTATION FORM ---
    const handleConsultationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        
        if (type === 'file') {
            const file = (e.target as HTMLInputElement).files?.[0] || null;
            setConsultationData(prev => ({ ...prev, attachment: file }));
            setFileName(file ? file.name : '');
        } else {
            const checked = (e.target as HTMLInputElement).checked;
            setConsultationData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
        }
        
        if (consultationErrors[name as keyof ConsultationFormErrors]) {
            setConsultationErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const validateConsultationForm = () => {
        const newErrors: ConsultationFormErrors = {};
        if (!consultationData.fullName) newErrors.fullName = 'validation.fullName.required';
        if (!consultationData.email) newErrors.email = 'validation.email.required';
        else if (!/\S+@\S+\.\S+/.test(consultationData.email)) newErrors.email = 'validation.email.invalid';
        if (!consultationData.phone) newErrors.phone = 'validation.phone.required';
        if (!consultationData.topic) newErrors.topic = 'validation.topic.required';
        if (consultationData.topic === 'Inne' && !consultationData.otherTopic) newErrors.otherTopic = 'validation.otherTopic.required';
        setConsultationErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleConsultationSubmit = (method: 'whatsapp' | 'email') => {
        if (validateConsultationForm()) {
            const topic = consultationData.topic === 'Inne' ? consultationData.otherTopic : consultationData.topic;
            const subject = `${t('contact.tabs.consultation')} - ${consultationData.fullName}`;
            let body = `*${t('contact.tabs.consultation')}*\n\n`;
            body += `*${t('contact.consultation.fullName')}:* ${consultationData.fullName}\n`;
            body += `*${t('contact.form.email')}:* ${consultationData.email}\n`;
            body += `*${t('contact.form.phone')}:* ${consultationData.phone}\n`;
            body += `*${t('contact.consultation.whatsapp')}:* ${consultationData.wantsWhatsApp ? 'Tak' : 'Nie'}\n`;
            body += `*${t('contact.consultation.topic')}:* ${topic}\n`;
            if (consultationData.description) {
                body += `*${t('contact.consultation.description')}:*\n${consultationData.description}\n`;
            }

            if (method === 'whatsapp') {
                if (consultationData.attachment) body += `\n_${t('contact.form.whatsappAttachmentNotice')}_`;
                const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(body)}`;
                window.open(whatsappUrl, '_blank');
                alert(t('contact.form.whatsappSuccess'));
            } else { // email
                if (consultationData.attachment) body += `\n\n${t('contact.form.emailAttachmentNotice')}`;
                const mailtoUrl = `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body.replace(/\*/g, ''))}`;
                window.location.href = mailtoUrl;
                alert(t('contact.form.emailSuccess'));
            }

            setConsultationData({ fullName: '', email: '', phone: '', wantsWhatsApp: false, topic: '', otherTopic: '', description: '', attachment: null });
            setFileName('');
        }
    };

    // --- HANDLERS FOR TAX RETURN FORM ---
    const handleTaxReturnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'file') {
            const selectedFiles = (e.target as HTMLInputElement).files;
            setTaxReturnData(prev => ({ ...prev, files: selectedFiles ? Array.from(selectedFiles) : [] }));
        } else {
            const checked = (e.target as HTMLInputElement).checked;
            setTaxReturnData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
        }
        if (taxReturnErrors[name as keyof TaxReturnFormErrors]) {
            setTaxReturnErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const validateTaxReturnForm = () => {
        const newErrors: TaxReturnFormErrors = {};
        if (!taxReturnData.fullName) newErrors.fullName = 'validation.fullName.required';
        if (!taxReturnData.email) newErrors.email = 'validation.email.required';
        else if (!/\S+@\S+\.\S+/.test(taxReturnData.email)) newErrors.email = 'validation.email.invalid';
        if (!taxReturnData.phone) newErrors.phone = 'validation.phone.required';
        if (!taxReturnData.taxYear) newErrors.taxYear = 'validation.taxYear.required';
        setTaxReturnErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleTaxReturnSubmit = (method: 'whatsapp' | 'email') => {
        if (validateTaxReturnForm()) {
            const subject = `${t('contact.tabs.tax')} – ${taxReturnData.fullName}`;
            let body = `*${t('contact.tabs.tax')}*\n\n`;
            body += `*${t('contact.consultation.fullName')}:* ${taxReturnData.fullName}\n`;
            body += `*${t('contact.taxReturn.bsn')}:* ${taxReturnData.bsn || 'Nie podano'}\n`;
            body += `*${t('contact.form.email')}:* ${taxReturnData.email}\n`;
            body += `*${t('contact.form.phone')}:* ${taxReturnData.phone}\n`;
            body += `*${t('contact.taxReturn.year')}:* ${taxReturnData.taxYear}\n`;
            body += `*${t('contact.taxReturn.jointReturn')}:* ${taxReturnData.jointReturn ? 'Tak' : 'Nie'}\n`;

            if (method === 'whatsapp') {
                if (taxReturnData.files.length > 0) body += `\n_${t('contact.form.whatsappAttachmentNotice')}_`;
                const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(body)}`;
                window.open(whatsappUrl, '_blank');
                alert(t('contact.form.whatsappSuccess'));
            } else { // email
                if (taxReturnData.files.length > 0) body += `\n\n${t('contact.form.emailAttachmentNotice')}`;
                const mailtoUrl = `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body.replace(/\*/g, ''))}`;
                window.location.href = mailtoUrl;
                alert(t('contact.form.emailSuccess'));
            }
            setTaxReturnData({ fullName: '', bsn: '', email: '', phone: '', taxYear: '', files: [], jointReturn: false });
        }
    };

    // --- HANDLERS FOR HEALTHCARE APPLICATION FORM ---
    const handleHealthcareChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === 'file') {
            const file = (e.target as HTMLInputElement).files?.[0] || null;
            setHealthcareData(prev => ({ ...prev, cv: file }));
            setCvFileName(file ? file.name : '');
        } else {
            setHealthcareData(prev => ({ ...prev, [name]: value }));
        }

        if (healthcareErrors[name as keyof HealthcareFormErrors]) {
            setHealthcareErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const validateHealthcareForm = () => {
        const newErrors: HealthcareFormErrors = {};
        if (!healthcareData.fullName) newErrors.fullName = 'validation.fullName.required';
        if (!healthcareData.email) newErrors.email = 'validation.email.required';
        else if (!/\S+@\S+\.\S+/.test(healthcareData.email)) newErrors.email = 'validation.email.invalid';
        if (!healthcareData.phone) newErrors.phone = 'validation.phone.required';
        if (!healthcareData.specialization) newErrors.specialization = 'validation.specialization.required';
        if (!healthcareData.experience) newErrors.experience = 'validation.experience.required';
        if (!healthcareData.availability) newErrors.availability = 'validation.availability.required';
        if (!healthcareData.cv) newErrors.cv = 'validation.cv.required';
        setHealthcareErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleHealthcareSubmit = (method: 'whatsapp' | 'email') => {
        if (validateHealthcareForm()) {
            const subject = `${t('contact.tabs.healthcareApply')} - ${healthcareData.fullName}`;
            let body = `*${t('contact.tabs.healthcareApply')}*\n\n`;
            body += `*${t('contact.healthcare.fullName')}:* ${healthcareData.fullName}\n`;
            body += `*${t('contact.form.email')}:* ${healthcareData.email}\n`;
            body += `*${t('contact.form.phone')}:* ${healthcareData.phone}\n`;
            body += `*${t('contact.healthcare.specialization')}:* ${healthcareData.specialization}\n`;
            body += `*${t('contact.healthcare.experience')}:* ${healthcareData.experience} ${t('contact.healthcare.experience.years')}\n`;
            body += `*${t('contact.healthcare.availability')}:* ${healthcareData.availability}\n`;
            if (healthcareData.message) {
                 body += `*${t('contact.healthcare.message')}:*\n${healthcareData.message}\n`;
            }

            if (method === 'whatsapp') {
                body += `\n_${t('contact.form.whatsappAttachmentNotice')}_`;
                const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(body)}`;
                window.open(whatsappUrl, '_blank');
                alert(t('contact.form.whatsappSuccess'));
            } else { // email
                body += `\n\n${t('contact.form.emailAttachmentNotice')}`;
                const mailtoUrl = `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body.replace(/\*/g, ''))}`;
                window.location.href = mailtoUrl;
                alert(t('contact.form.emailSuccess'));
            }
            
            setHealthcareData({ fullName: '', email: '', phone: '', specialization: '', experience: '', availability: '', cv: null, message: '' });
            setCvFileName('');
        }
    };


    const projectTypes = [
        { value: 'Woningbouw', labelKey: 'contact.form.projectTypes.residential' },
        { value: 'Commerciële bouw', labelKey: 'contact.form.projectTypes.commercial' },
        { value: 'Industriële bouw', labelKey: 'contact.form.projectTypes.industrial' },
        { value: 'Infrastructuur', labelKey: 'contact.form.projectTypes.infrastructure' },
        { value: 'Renovatie', labelKey: 'contact.form.projectTypes.renovation' },
        { value: 'Landschapsarchitectuur', labelKey: 'contact.form.projectTypes.landscaping' },
        { value: 'Anders', labelKey: 'contact.form.projectTypes.other' },
    ];
    const consultationTopics = [
        { value: 'Rozliczenie roczne (jaaropgave)', labelKey: 'contact.consultation.topics.tax' },
        { value: 'Zakładanie firmy (ZZP / BV)', labelKey: 'contact.consultation.topics.company' },
        { value: 'Księgowość firmy', labelKey: 'contact.consultation.topics.accounting' },
        { value: 'Podatki pracownicze', labelKey: 'contact.consultation.topics.employeeTaxes' },
        { value: 'Inne', labelKey: 'contact.consultation.topics.other' },
    ];
    const taxYears = [2025, 2024, 2023, 2022, 2021];
    const specializations = [
        { value: 'Pielęgniarka', labelKey: 'contact.healthcare.specializations.nurse' },
        { value: 'Opiekun', labelKey: 'contact.healthcare.specializations.caregiver' },
        { value: 'Fizjoterapeuta', labelKey: 'contact.healthcare.specializations.physiotherapist' },
        { value: 'Lekarz', labelKey: 'contact.healthcare.specializations.doctor' },
        { value: 'Inne', labelKey: 'contact.healthcare.specializations.other' },
    ];
    const availabilities = [
        { value: 'Pełny etat', labelKey: 'contact.healthcare.availabilities.fullTime' },
        { value: 'Część etatu', labelKey: 'contact.healthcare.availabilities.partTime' },
        { value: 'Elastycznie', labelKey: 'contact.healthcare.availabilities.flexible' },
    ];


    const TabButton: React.FC<{ tabId: ActiveTab; children: React.ReactNode }> = ({ tabId, children }) => (
        <button
            onClick={() => setActiveTab(tabId)}
            className={`relative px-4 py-3 text-sm sm:text-base font-semibold transition-colors duration-300 w-full text-center ${
                activeTab === tabId ? 'text-white' : 'text-gray-400 hover:text-white'
            }`}
        >
            {children}
            {activeTab === tabId && (
                <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400"
                    layoutId="underline"
                />
            )}
        </button>
    );
    
    const renderForm = () => {
        const formVariants = {
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
        };

        const submitButtons = (handler: (method: 'whatsapp' | 'email') => void) => (
             <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button type="button" onClick={() => handler('whatsapp')} className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1e213a] focus:ring-green-500">
                    <WhatsAppIcon />
                    {t('contact.form.submitWhatsapp')}
                </button>
                <button type="button" onClick={() => handler('email')} className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1e213a] focus:ring-blue-500">
                    <EmailIcon />
                    {t('contact.form.submitEmail')}
                </button>
            </div>
        );

        switch (activeTab) {
            case 'quote':
                return (
                    <motion.div key="quote" variants={formVariants} initial="hidden" animate="visible" exit="exit">
                        <form onSubmit={(e) => e.preventDefault()} noValidate className="space-y-6 mt-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormInput id="name" label={t('contact.form.name')} placeholder={t('contact.form.name.placeholder')} value={formData.name} onChange={handleChange} error={errors.name ? t(errors.name) : null} required />
                                <FormInput id="companyName" label={t('contact.form.companyName')} placeholder={t('contact.form.companyName.placeholder')} value={formData.companyName} onChange={handleChange} error={errors.companyName ? t(errors.companyName) : null} hint={t('contact.form.companyName.hint')} required />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormInput id="email" label={t('contact.form.email')} placeholder={t('contact.form.email.placeholder')} type="email" value={formData.email} onChange={handleChange} error={errors.email ? t(errors.email) : null} required />
                                <FormInput id="confirmEmail" label={t('contact.form.confirmEmail')} placeholder={t('contact.form.confirmEmail.placeholder')} type="email" value={formData.confirmEmail} onChange={handleChange} error={errors.confirmEmail ? t(errors.confirmEmail) : null} required />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormInput id="phoneNumber" label={t('contact.form.phone')} placeholder={t('contact.form.phone.placeholder')} type="tel" value={formData.phoneNumber} onChange={handleChange} error={errors.phoneNumber ? t(errors.phoneNumber) : null} required />
                                <FormInput id="address" label={t('contact.form.address')} placeholder={t('contact.form.address.placeholder')} value={formData.address} onChange={handleChange} error={errors.address ? t(errors.address) : null} hint={t('contact.form.address.hint')} required />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-semibold text-gray-300 mb-3">{t('contact.form.projectType')}<span className="text-red-400"> *</span></label>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {projectTypes.map(type => (
                                        <div key={type.value} className="flex items-center">
                                            <input type="radio" id={type.value} name="projectType" value={type.value} checked={formData.projectType === type.value} onChange={handleChange} className="w-4 h-4 text-cyan-500 bg-gray-700 border-gray-600 focus:ring-cyan-600 ring-offset-gray-800 focus:ring-2" />
                                            <label htmlFor={type.value} className="ml-2 text-sm font-medium text-gray-300">{t(type.labelKey)}</label>
                                        </div>
                                    ))}
                                </div>
                                {errors.projectType && <p className="mt-2 text-xs text-red-400">{t(errors.projectType)}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormInput id="startDate" label={t('contact.form.startDate')} placeholder={t('contact.form.startDate.placeholder')} type="date" value={formData.startDate} onChange={handleChange} error={errors.startDate ? t(errors.startDate) : null} required />
                                <FormInput id="endDate" label={t('contact.form.endDate')} placeholder={t('contact.form.endDate.placeholder')} type="date" value={formData.endDate} onChange={handleChange} error={errors.endDate ? t(errors.endDate) : null} required />
                            </div>

                            <FormTextarea id="equipment" label={t('contact.form.equipment')} placeholder={t('contact.form.equipment.placeholder')} value={formData.equipment} onChange={handleChange} error={errors.equipment ? t(errors.equipment) : null} hint={t('contact.form.equipment.hint')} required />
                            <FormTextarea id="requests" label={t('contact.form.requests')} placeholder={t('contact.form.requests.placeholder')} value={formData.requests} onChange={handleChange} error={errors.requests ? t(errors.requests) : null} hint={t('contact.form.requests.hint')} />
                            
                            <div>
                                <div className="flex items-start">
                                    <div className="flex items-center h-5"><input id="privacy" name="privacy" type="checkbox" checked={formData.privacy} onChange={handleChange} className="w-4 h-4 text-cyan-500 bg-gray-700 border-gray-600 rounded focus:ring-cyan-600 ring-offset-gray-800 focus:ring-2" /></div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="privacy" className="text-gray-300">{t('contact.form.privacy.part1')} <a href="#" className="text-cyan-400 hover:underline">{t('contact.form.privacy.link')}</a>{t('contact.form.privacy.part2')}<span className="text-red-400"> *</span></label>
                                    </div>
                                </div>
                                 {errors.privacy && <p className="mt-2 text-xs text-red-400">{t(errors.privacy)}</p>}
                            </div>
                            {submitButtons(handleQuoteSubmit)}
                        </form>
                    </motion.div>
                );
            case 'consultation':
                return (
                    <motion.div key="consultation" variants={formVariants} initial="hidden" animate="visible" exit="exit">
                         <form onSubmit={(e) => e.preventDefault()} noValidate className="space-y-6 mt-8">
                            <FormInput id="fullName" label={t('contact.consultation.fullName')} placeholder={t('contact.consultation.fullName.placeholder')} value={consultationData.fullName} onChange={handleConsultationChange} error={consultationErrors.fullName ? t(consultationErrors.fullName) : null} required />
                            <FormInput id="email" label={t('contact.form.email')} placeholder={t('contact.form.email.placeholder')} type="email" value={consultationData.email} onChange={handleConsultationChange} error={consultationErrors.email ? t(consultationErrors.email) : null} required />
                            <FormInput id="phone" label={t('contact.form.phone')} placeholder={t('contact.consultation.phone.placeholder')} type="tel" value={consultationData.phone} onChange={handleConsultationChange} error={consultationErrors.phone ? t(consultationErrors.phone) : null} required />
                            <div className="flex items-center">
                                <input type="checkbox" id="wantsWhatsApp" name="wantsWhatsApp" checked={consultationData.wantsWhatsApp} onChange={handleConsultationChange} className="w-4 h-4 text-cyan-500 bg-gray-700 border-gray-600 rounded focus:ring-cyan-600 ring-offset-gray-800" />
                                <label htmlFor="wantsWhatsApp" className="ml-2 text-sm font-medium text-gray-300">{t('contact.consultation.whatsapp')}</label>
                            </div>
                            <div>
                                <label htmlFor="topic" className="block text-sm font-semibold text-gray-300 mb-2">{t('contact.consultation.topic')} <span className="text-red-400">*</span></label>
                                <select id="topic" name="topic" value={consultationData.topic} onChange={handleConsultationChange} className={`w-full bg-gray-800/50 border ${consultationErrors.topic ? 'border-red-500' : 'border-blue-500/30'} rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 ${consultationErrors.topic ? 'focus:ring-red-500' : 'focus:ring-blue-400'}`}>
                                    <option value="">{t('contact.consultation.topic.placeholder')}</option>
                                    {consultationTopics.map(topic => <option key={topic.value} value={topic.value}>{t(topic.labelKey)}</option>)}
                                </select>
                                {consultationErrors.topic && <p className="mt-1 text-xs text-red-400">{t(consultationErrors.topic)}</p>}
                            </div>
                            {consultationData.topic === 'Inne' && (
                                <FormInput id="otherTopic" label={t('contact.consultation.otherTopic')} placeholder={t('contact.consultation.otherTopic.placeholder')} value={consultationData.otherTopic} onChange={handleConsultationChange} error={consultationErrors.otherTopic ? t(consultationErrors.otherTopic) : null} required />
                            )}
                            <FormTextarea id="description" label={t('contact.consultation.description')} placeholder={t('contact.consultation.description.placeholder')} value={consultationData.description} onChange={handleConsultationChange} error={null} />
                            <div>
                                <label className="block text-sm font-semibold text-gray-300 mb-2">{t('contact.consultation.attachment')}</label>
                                <label htmlFor="attachment" className="w-full cursor-pointer bg-gray-800/50 border border-blue-500/30 rounded-lg px-4 py-3 text-gray-400 flex items-center justify-center hover:bg-gray-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                                    {fileName || t('contact.consultation.attachment.select')}
                                </label>
                                <input type="file" id="attachment" name="attachment" onChange={handleConsultationChange} className="hidden" />
                            </div>
                            {submitButtons(handleConsultationSubmit)}
                        </form>
                    </motion.div>
                );
            case 'callback':
                 return (
                    <motion.div key="callback" variants={formVariants} initial="hidden" animate="visible" exit="exit">
                        <p className="mt-8 text-center text-gray-400">{t('contact.callback.subtitle')}</p>
                        <form onSubmit={(e) => e.preventDefault()} noValidate className="space-y-6 mt-6 max-w-lg mx-auto">
                            <FormInput id="callbackName" label={t('contact.form.name')} placeholder={t('contact.form.name.placeholder')} value={callbackData.callbackName} onChange={handleCallbackChange} error={callbackErrors.callbackName ? t(callbackErrors.callbackName) : null} required />
                            <FormInput id="callbackCompanyName" label={t('contact.form.companyName')} placeholder={t('contact.form.companyName.placeholder')} value={callbackData.callbackCompanyName} onChange={handleCallbackChange} error={callbackErrors.callbackCompanyName ? t(callbackErrors.callbackCompanyName) : null} required />
                            <FormInput id="callbackPhoneNumber" label={t('contact.form.phone')} placeholder={t('contact.form.phone.placeholder')} type="tel" value={callbackData.callbackPhoneNumber} onChange={handleCallbackChange} error={callbackErrors.callbackPhoneNumber ? t(callbackErrors.callbackPhoneNumber) : null} required />
                            
                            {submitButtons(handleCallbackSubmit)}
                        </form>
                    </motion.div>
                );
            case 'tax':
                return (
                    <motion.div key="tax" variants={formVariants} initial="hidden" animate="visible" exit="exit">
                        <p className="mt-8 text-center text-gray-400">{t('contact.taxReturn.subtitle')}</p>
                        <form onSubmit={(e) => e.preventDefault()} noValidate className="space-y-6 mt-6">
                            <FormInput id="fullName" label={t('contact.consultation.fullName')} placeholder={t('contact.consultation.fullName.placeholder')} value={taxReturnData.fullName} onChange={handleTaxReturnChange} error={taxReturnErrors.fullName ? t(taxReturnErrors.fullName) : null} required />
                            <FormInput id="bsn" label={t('contact.taxReturn.bsn')} placeholder={t('contact.taxReturn.bsn.placeholder')} value={taxReturnData.bsn} onChange={handleTaxReturnChange} error={null} />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormInput id="email" label={t('contact.form.email')} placeholder={t('contact.form.email.placeholder')} type="email" value={taxReturnData.email} onChange={handleTaxReturnChange} error={taxReturnErrors.email ? t(taxReturnErrors.email) : null} required />
                                <FormInput id="phone" label={t('contact.taxReturn.phone')} placeholder={t('contact.consultation.phone.placeholder')} type="tel" value={taxReturnData.phone} onChange={handleTaxReturnChange} error={taxReturnErrors.phone ? t(taxReturnErrors.phone) : null} required />
                            </div>
                            <div>
                                <label htmlFor="taxYear" className="block text-sm font-semibold text-gray-300 mb-2">{t('contact.taxReturn.year')} <span className="text-red-400">*</span></label>
                                <select id="taxYear" name="taxYear" value={taxReturnData.taxYear} onChange={handleTaxReturnChange} className={`w-full bg-gray-800/50 border ${taxReturnErrors.taxYear ? 'border-red-500' : 'border-blue-500/30'} rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 ${taxReturnErrors.taxYear ? 'focus:ring-red-500' : 'focus:ring-blue-400'}`}>
                                    <option value="">{t('contact.taxReturn.year.placeholder')}</option>
                                    {taxYears.map(year => <option key={year} value={year}>{year}</option>)}
                                </select>
                                {taxReturnErrors.taxYear && <p className="mt-1 text-xs text-red-400">{t(taxReturnErrors.taxYear)}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-300 mb-2">{t('contact.taxReturn.upload')}</label>
                                <label htmlFor="files" className="w-full cursor-pointer bg-gray-800/50 border border-blue-500/30 rounded-lg px-4 py-3 text-gray-400 flex items-center justify-center hover:bg-gray-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                                    {t('contact.taxReturn.upload.select')}
                                </label>
                                <input type="file" id="files" name="files" onChange={handleTaxReturnChange} className="hidden" multiple />
                                {taxReturnData.files.length > 0 && (
                                    <div className="mt-2 text-xs text-gray-400">
                                        <p className="font-semibold">{t('contact.taxReturn.upload.selected')}</p>
                                        <ul className="list-disc list-inside">
                                            {taxReturnData.files.map((file, index) => <li key={index}>{file.name}</li>)}
                                        </ul>
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center">
                                <input type="checkbox" id="jointReturn" name="jointReturn" checked={taxReturnData.jointReturn} onChange={handleTaxReturnChange} className="w-4 h-4 text-cyan-500 bg-gray-700 border-gray-600 rounded focus:ring-cyan-600 ring-offset-gray-800" />
                                <label htmlFor="jointReturn" className="ml-2 text-sm font-medium text-gray-300">{t('contact.taxReturn.jointReturn')}</label>
                            </div>
                            {submitButtons(handleTaxReturnSubmit)}
                        </form>
                    </motion.div>
                );
            case 'healthcareApply':
                return (
                    <motion.div key="healthcareApply" variants={formVariants} initial="hidden" animate="visible" exit="exit">
                        <p className="mt-8 text-center text-gray-400">{t('contact.healthcare.subtitle')}</p>
                        <form onSubmit={(e) => e.preventDefault()} noValidate className="space-y-6 mt-6">
                             <FormInput id="fullName" label={t('contact.healthcare.fullName')} placeholder={t('contact.consultation.fullName.placeholder')} value={healthcareData.fullName} onChange={handleHealthcareChange} error={healthcareErrors.fullName ? t(healthcareErrors.fullName) : null} required />
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormInput id="email" label={t('contact.form.email')} placeholder={t('contact.form.email.placeholder')} type="email" value={healthcareData.email} onChange={handleHealthcareChange} error={healthcareErrors.email ? t(healthcareErrors.email) : null} required />
                                <FormInput id="phone" label={t('contact.form.phone')} placeholder={t('contact.consultation.phone.placeholder')} type="tel" value={healthcareData.phone} onChange={handleHealthcareChange} error={healthcareErrors.phone ? t(healthcareErrors.phone) : null} required />
                             </div>
                             <div>
                                <label htmlFor="specialization" className="block text-sm font-semibold text-gray-300 mb-2">{t('contact.healthcare.specialization')} <span className="text-red-400">*</span></label>
                                <select id="specialization" name="specialization" value={healthcareData.specialization} onChange={handleHealthcareChange} className={`w-full bg-gray-800/50 border ${healthcareErrors.specialization ? 'border-red-500' : 'border-blue-500/30'} rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 ${healthcareErrors.specialization ? 'focus:ring-red-500' : 'focus:ring-blue-400'}`}>
                                    <option value="">{t('contact.healthcare.specialization.placeholder')}</option>
                                    {specializations.map(spec => <option key={spec.value} value={spec.value}>{t(spec.labelKey)}</option>)}
                                </select>
                                {healthcareErrors.specialization && <p className="mt-1 text-xs text-red-400">{t(healthcareErrors.specialization)}</p>}
                            </div>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormInput id="experience" label={t('contact.healthcare.experience')} placeholder={t('contact.healthcare.experience.placeholder')} type="number" value={healthcareData.experience} onChange={handleHealthcareChange} error={healthcareErrors.experience ? t(healthcareErrors.experience) : null} required />
                                <div>
                                    <label htmlFor="availability" className="block text-sm font-semibold text-gray-300 mb-2">{t('contact.healthcare.availability')} <span className="text-red-400">*</span></label>
                                    <select id="availability" name="availability" value={healthcareData.availability} onChange={handleHealthcareChange} className={`w-full bg-gray-800/50 border ${healthcareErrors.availability ? 'border-red-500' : 'border-blue-500/30'} rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 ${healthcareErrors.availability ? 'focus:ring-red-500' : 'focus:ring-blue-400'}`}>
                                        <option value="">{t('contact.healthcare.availability.placeholder')}</option>
                                        {availabilities.map(avail => <option key={avail.value} value={avail.value}>{t(avail.labelKey)}</option>)}
                                    </select>
                                    {healthcareErrors.availability && <p className="mt-1 text-xs text-red-400">{t(healthcareErrors.availability)}</p>}
                                </div>
                             </div>
                              <div>
                                <label className="block text-sm font-semibold text-gray-300 mb-2">{t('contact.healthcare.cv')} <span className="text-red-400">*</span></label>
                                <label htmlFor="cv" className="w-full cursor-pointer bg-gray-800/50 border border-blue-500/30 rounded-lg px-4 py-3 text-gray-400 flex items-center justify-center hover:bg-gray-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                                    {cvFileName || t('contact.consultation.attachment.select')}
                                </label>
                                <input type="file" id="cv" name="cv" onChange={handleHealthcareChange} className="hidden" accept=".pdf,.doc,.docx" />
                                {healthcareErrors.cv && <p className="mt-1 text-xs text-red-400">{t(healthcareErrors.cv)}</p>}
                            </div>
                            <FormTextarea id="message" label={t('contact.healthcare.message')} placeholder={t('contact.healthcare.message.placeholder')} value={healthcareData.message} onChange={handleHealthcareChange} error={null} />
                            {submitButtons(handleHealthcareSubmit)}
                        </form>
                    </motion.div>
                );
        }
    }

    return (
        <div className="bg-[#0d0f28] py-16 sm:py-24 px-4">
            <div className="container mx-auto max-w-4xl">
                 <div className="text-center mb-10">
                    <h2 className="text-lg font-semibold text-cyan-400">{t('contact.main.title')}</h2>
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mt-2">{t('contact.main.subtitle')}</h1>
                </div>
                <div className="bg-[#1e213a]/60 border border-blue-500/20 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
                    <div className="grid grid-cols-2 md:grid-cols-5 border-b border-blue-500/20 mb-8">
                        <TabButton tabId="quote">{t('contact.tabs.quote')}</TabButton>
                        <TabButton tabId="healthcareApply">{t('contact.tabs.healthcareApply')}</TabButton>
                        <TabButton tabId="consultation">{t('contact.tabs.consultation')}</TabButton>
                        <TabButton tabId="callback">{t('contact.tabs.callback')}</TabButton>
                        <TabButton tabId="tax">{t('contact.tabs.tax')}</TabButton>
                    </div>

                    <AnimatePresence mode="wait">
                        {renderForm()}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;