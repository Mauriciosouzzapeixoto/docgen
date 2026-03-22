// Variáveis globais
let selectedProjectType = 'mobile';
let selectedDocumentType = 'project';
let formData = {};
let uploadedImagesList = [];

// Elementos DOM
const typeButtons = document.querySelectorAll('.type-btn');
const documentTypeButtons = document.querySelectorAll('.document-type-selector .type-btn');
const form = document.getElementById('documentationForm');
const authorizationForm = document.getElementById('authorizationForm');
const featuresList = document.querySelector('.features-list');
const addFeatureBtn = document.querySelector('.add-feature-btn');
const documentationOutput = document.getElementById('documentationOutput');
const documentationContent = document.getElementById('documentationContent');
const downloadBtn = document.getElementById('downloadBtn');
const copyBtn = document.getElementById('copyBtn');
const newDocBtn = document.getElementById('newDocBtn');
const teamList = document.querySelector('.team-list');
const addMemberBtn = document.querySelector('.add-member-btn');
const teamReportsList = document.querySelector('.team-reports-list');
const addReportBtn = document.querySelector('.add-report-btn');
const studentsList = document.querySelector('.students-list');
const addStudentBtn = document.querySelector('.add-student-btn');
const projectWizard = document.getElementById('projectWizard');
const authorizationWizard = document.getElementById('authorizationWizard');
const standardsWizard = document.getElementById('standardsWizard');
const enterpriseWizard = document.getElementById('enterpriseWizard');
const enterpriseForm = document.getElementById('enterpriseForm');
const standardsForm = document.getElementById('standardsForm');
const uploadArea = document.getElementById('uploadArea');
const imageInput = document.getElementById('imageInput');
const uploadedImages = document.getElementById('uploadedImages');

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    setupFormValidation();
});

// Event Listeners
function initializeEventListeners() {
    // Seleção de tipo de documento
    documentTypeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            documentTypeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedDocumentType = btn.dataset.document;
            
            // Mostrar/ocultar wizards
            projectWizard.style.display = selectedDocumentType === 'project' ? 'block' : 'none';
            authorizationWizard.style.display = selectedDocumentType === 'authorization' ? 'block' : 'none';
            standardsWizard.style.display = selectedDocumentType === 'standards' ? 'block' : 'none';
            enterpriseWizard.style.display = selectedDocumentType === 'enterprise' ? 'block' : 'none';
        });
    });

    // Seleção de tipo de projeto
    typeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            typeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedProjectType = btn.dataset.type;
        });
    });

    // Adicionar funcionalidade
    if (addFeatureBtn) {
        addFeatureBtn.addEventListener('click', addFeatureField);
    }

    // Adicionar membro
    if (addMemberBtn) {
        addMemberBtn.addEventListener('click', addMemberField);
    }

    // Adicionar relatório individual
    if (addReportBtn) {
        addReportBtn.addEventListener('click', addReportField);
    }

    // Adicionar aluno
    if (addStudentBtn) {
        addStudentBtn.addEventListener('click', addStudentField);
    }

    // Checkbox "outro" do formulário de autorização
    const authOtherCheckbox = document.getElementById('auth-other');
    const authOtherSpecify = document.getElementById('auth-other-specify');
    
    if (authOtherCheckbox && authOtherSpecify) {
        authOtherCheckbox.addEventListener('change', () => {
            authOtherSpecify.disabled = !authOtherCheckbox.checked;
            if (!authOtherCheckbox.checked) {
                authOtherSpecify.value = '';
            }
        });
    }

    // Submissão do formulário principal
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }

    // Submissão do formulário de autorização
    if (authorizationForm) {
        authorizationForm.addEventListener('submit', handleAuthorizationFormSubmit);
    }

    // Submissão do formulário de normas
    if (standardsForm) {
        standardsForm.addEventListener('submit', handleStandardsFormSubmit);
    }

    // Submissão do formulário empresarial
    if (enterpriseForm) {
        enterpriseForm.addEventListener('submit', handleEnterpriseFormSubmit);
    }

    // Botões de ação
    downloadBtn.addEventListener('click', downloadDocumentation);
    copyBtn.addEventListener('click', copyDocumentation);
    newDocBtn.addEventListener('click', resetForm);

    // Upload de imagens
    if (uploadArea && imageInput) {
        setupImageUpload();
    }

    // Adicionar membro da equipe empresarial
    const addTeamMemberBtn = document.querySelector('.add-team-member-btn');
    if (addTeamMemberBtn) {
        addTeamMemberBtn.addEventListener('click', addTeamMemberField);
    }
}

// Adicionar campo de membro da equipe empresarial
function addTeamMemberField() {
    const teamList = document.querySelector('.team-list');
    const newMember = document.createElement('div');
    newMember.className = 'team-item';
    newMember.innerHTML = `
        <input type="text" name="teamName[]" placeholder="Nome completo" required>
        <input type="text" name="teamRole[]" placeholder="Cargo/Função" required>
        <input type="email" name="teamEmail[]" placeholder="E-mail" required>
        <button type="button" class="remove-team-member">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    teamList.appendChild(newMember);
    
    // Adicionar evento de remover
    const removeBtn = newMember.querySelector('.remove-team-member');
    removeBtn.addEventListener('click', () => {
        newMember.remove();
    });
}

// Configurar upload de imagens
function setupImageUpload() {
    // Click para abrir seletor de arquivos
    uploadArea.addEventListener('click', () => {
        imageInput.click();
    });

    // Drag and drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('drag-over');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('drag-over');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('drag-over');
        handleFiles(e.dataTransfer.files);
    });

    // Input change
    imageInput.addEventListener('change', (e) => {
        handleFiles(e.target.files);
    });
}

// Manipular arquivos de imagem
function handleFiles(files) {
    Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                addImageToGallery(e.target.result, file.name);
            };
            reader.readAsDataURL(file);
        } else {
            showNotification('Por favor, selecione apenas arquivos de imagem', 'error');
        }
    });
}

// Adicionar imagem à galeria
function addImageToGallery(dataUrl, fileName) {
    const imageId = Date.now() + Math.random();
    uploadedImagesList.push({
        id: imageId,
        dataUrl: dataUrl,
        fileName: fileName
    });

    const imageElement = document.createElement('div');
    imageElement.className = 'uploaded-image-item';
    imageElement.dataset.imageId = imageId;
    imageElement.innerHTML = `
        <img src="${dataUrl}" alt="${fileName}">
        <div class="image-overlay">
            <button type="button" class="remove-image" onclick="removeImage(${imageId})">
                <i class="fas fa-times"></i>
            </button>
            <button type="button" class="view-image" onclick="viewImage('${dataUrl}', '${fileName}')">
                <i class="fas fa-eye"></i>
            </button>
        </div>
        <div class="image-info">
            <p class="image-name">${fileName}</p>
        </div>
    `;

    uploadedImages.appendChild(imageElement);
    showNotification('Imagem adicionada com sucesso!', 'success');
}

// Remover imagem
function removeImage(imageId) {
    uploadedImagesList = uploadedImagesList.filter(img => img.id !== imageId);
    const imageElement = document.querySelector(`[data-image-id="${imageId}"]`);
    if (imageElement) {
        imageElement.remove();
    }
    showNotification('Imagem removida', 'info');
}

// Visualizar imagem em modal
function viewImage(dataUrl, fileName) {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="close-modal" onclick="closeImageModal()">
                <i class="fas fa-times"></i>
            </button>
            <img src="${dataUrl}" alt="${fileName}">
            <div class="modal-caption">
                <h3>${fileName}</h3>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeImageModal();
        }
    });
}

// Fechar modal de imagem
function closeImageModal() {
    const modal = document.querySelector('.image-modal');
    if (modal) {
        modal.remove();
    }
}

// Funções globais para eventos inline
window.removeImage = removeImage;
window.viewImage = viewImage;
window.closeImageModal = closeImageModal;

// Manipular submissão do formulário empresarial
function handleEnterpriseFormSubmit(e) {
    e.preventDefault();
    
    if (!validateEnterpriseForm()) {
        showNotification('Por favor, preencha todos os campos obrigatórios', 'error');
        return;
    }
    
    // Coletar dados do formulário empresarial
    collectEnterpriseFormData();
    
    // Gerar documentação empresarial
    generateEnterpriseDocumentation();
    
    // Mostrar resultado
    showDocumentationOutput();
    
    // Scroll para o resultado
    documentationOutput.scrollIntoView({ behavior: 'smooth' });
}

// Validar formulário empresarial
function validateEnterpriseForm() {
    const requiredFields = enterpriseForm.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
        } else {
            field.classList.remove('error');
        }
    });
    
    // Validar que pelo menos uma versão foi selecionada
    const versionCheckboxes = enterpriseForm.querySelectorAll('input[name="documentVersions"]');
    const hasVersion = Array.from(versionCheckboxes).some(cb => cb.checked);
    
    if (!hasVersion) {
        showNotification('Selecione pelo menos uma versão do documento', 'error');
        return false;
    }
    
    return isValid;
}

// Coletar dados do formulário empresarial
function collectEnterpriseFormData() {
    const formDataObj = new FormData(enterpriseForm);
    
    // Coletar dados da equipe
    const teamNames = formDataObj.getAll('teamName[]');
    const teamRoles = formDataObj.getAll('teamRole[]');
    const teamEmails = formDataObj.getAll('teamEmail[]');
    
    const teamMembers = teamNames.map((name, index) => ({
        name: name,
        role: teamRoles[index],
        email: teamEmails[index]
    }));
    
    // Coletar versões selecionadas
    const versions = formDataObj.getAll('documentVersions');
    
    formData = {
        documentType: 'enterprise',
        company: {
            name: formDataObj.get('companyName'),
            cnpj: formDataObj.get('companyCNPJ'),
            address: formDataObj.get('companyAddress'),
            phone: formDataObj.get('companyPhone'),
            email: formDataObj.get('companyEmail')
        },
        document: {
            title: formDataObj.get('documentTitle'),
            purpose: formDataObj.get('documentPurpose'),
            scope: formDataObj.get('documentScope'),
            terms: formDataObj.get('documentTerms'),
            versions: versions,
            signatureType: formDataObj.get('signatureType'),
            signatureDate: formDataObj.get('signatureDate')
        },
        responsible: {
            name: formDataObj.get('responsibleName'),
            role: formDataObj.get('responsibleRole'),
            cpf: formDataObj.get('responsibleCPF'),
            email: formDataObj.get('responsibleEmail')
        },
        teamMembers: teamMembers
    };
}

// Gerar documentação empresarial
function generateEnterpriseDocumentation() {
    const doc = createEnterpriseDocumentationStructure();
    documentationContent.innerHTML = doc;
}
function handleStandardsFormSubmit(e) {
    e.preventDefault();
    
    if (!validateStandardsForm()) {
        showNotification('Por favor, preencha todos os campos obrigatórios', 'error');
        return;
    }
    
    // Coletar dados do formulário de normas
    collectStandardsFormData();
    
    // Gerar documentação padrão
    generateStandardsDocumentation();
    
    // Mostrar resultado
    showDocumentationOutput();
    
    // Scroll para o resultado
    documentationOutput.scrollIntoView({ behavior: 'smooth' });
}

// Validar formulário de normas
function validateStandardsForm() {
    const textareas = standardsForm.querySelectorAll('textarea');
    let hasContent = false;
    
    textareas.forEach(textarea => {
        if (textarea.value.trim()) {
            hasContent = true;
        }
    });
    
    if (!hasContent) {
        showNotification('Preencha pelo menos uma seção da documentação', 'error');
        return false;
    }
    
    return true;
}

// Coletar dados do formulário de normas
function collectStandardsFormData() {
    const formDataObj = new FormData(standardsForm);
    formData = {
        documentType: 'standards',
        design: {
            userFlows: formDataObj.get('user-flows'),
            styleGuide: formDataObj.get('style-guide')
        },
        architecture: {
            diagram: formDataObj.get('architecture-diagram'),
            dataDictionary: formDataObj.get('data-dictionary'),
            apiDocumentation: formDataObj.get('api-documentation')
        },
        code: {
            readme: formDataObj.get('readme-content'),
            technicalComments: formDataObj.get('technical-comments'),
            changelog: formDataObj.get('changelog')
        },
        business: {
            userStories: formDataObj.get('user-stories'),
            acceptanceCriteria: formDataObj.get('acceptance-criteria')
        },
        infrastructure: {
            corsAuth: formDataObj.get('cors-auth'),
            disasterRecovery: formDataObj.get('disaster-recovery')
        }
    };
}

// Gerar documentação padrão
function generateStandardsDocumentation() {
    const doc = createStandardsDocumentationStructure();
    documentationContent.innerHTML = doc;
}

// Criar estrutura da documentação padrão
function createStandardsDocumentationStructure() {
    return `
        <div class="standards-documentation">
            <h1>Documentação de Software - Normas e Padrões</h1>
            
            ${formData.design.userFlows || formData.design.styleGuide ? `
            <div class="standards-section">
                <h2>1. Documentação de Design (UI/UX)</h2>
                <div class="standards-section-content">
                    ${formData.design.userFlows ? `
                    <h3>User Flows</h3>
                    <p>${formData.design.userFlows}</p>
                    ` : ''}
                    
                    ${formData.design.styleGuide ? `
                    <h3>Style Guide</h3>
                    <p>${formData.design.styleGuide}</p>
                    ` : ''}
                </div>
            </div>
            ` : ''}
            
            ${formData.architecture.diagram || formData.architecture.dataDictionary || formData.architecture.apiDocumentation ? `
            <div class="standards-section">
                <h2>2. Arquitetura de Sistema</h2>
                <div class="standards-section-content">
                    ${formData.architecture.diagram ? `
                    <h3>Diagrama de Arquitetura</h3>
                    <p>${formData.architecture.diagram}</p>
                    ` : ''}
                    
                    ${formData.architecture.dataDictionary ? `
                    <h3>Dicionário de Dados (DER)</h3>
                    <p>${formData.architecture.dataDictionary}</p>
                    ` : ''}
                    
                    ${formData.architecture.apiDocumentation ? `
                    <h3>Documentação de API</h3>
                    <p>${formData.architecture.apiDocumentation}</p>
                    ` : ''}
                </div>
            </div>
            ` : ''}
            
            ${formData.code.readme || formData.code.technicalComments || formData.code.changelog ? `
            <div class="standards-section">
                <h2>3. Documentação de Código</h2>
                <div class="standards-section-content">
                    ${formData.code.readme ? `
                    <h3>README.md</h3>
                    <p>${formData.code.readme}</p>
                    ` : ''}
                    
                    ${formData.code.technicalComments ? `
                    <h3>Comentários Técnicos</h3>
                    <p>${formData.code.technicalComments}</p>
                    ` : ''}
                    
                    ${formData.code.changelog ? `
                    <h3>Changelog</h3>
                    <p>${formData.code.changelog}</p>
                    ` : ''}
                </div>
            </div>
            ` : ''}
            
            ${formData.business.userStories || formData.business.acceptanceCriteria ? `
            <div class="standards-section">
                <h2>4. Gestão e Negócio (Agile)</h2>
                <div class="standards-section-content">
                    ${formData.business.userStories ? `
                    <h3>User Stories</h3>
                    <p>${formData.business.userStories}</p>
                    ` : ''}
                    
                    ${formData.business.acceptanceCriteria ? `
                    <h3>Critérios de Aceite</h3>
                    <p>${formData.business.acceptanceCriteria}</p>
                    ` : ''}
                </div>
            </div>
            ` : ''}
            
            ${formData.infrastructure.corsAuth || formData.infrastructure.disasterRecovery ? `
            <div class="standards-section">
                <h2>5. Infraestrutura e Segurança</h2>
                <div class="standards-section-content">
                    ${formData.infrastructure.corsAuth ? `
                    <h3>Políticas de CORS e Autenticação</h3>
                    <p>${formData.infrastructure.corsAuth}</p>
                    ` : ''}
                    
                    ${formData.infrastructure.disasterRecovery ? `
                    <h3>Plano de Recuperação de Desastres</h3>
                    <p>${formData.infrastructure.disasterRecovery}</p>
                    ` : ''}
                </div>
            </div>
            ` : ''}
            
            <div class="info-box">
                <p><strong>Data de Geração:</strong> ${new Date().toLocaleDateString('pt-BR')}</p>
                <p><strong>Gerado por:</strong> DocGen - Gerador de Documentação Padrão</p>
                <p><strong>Padrões Aplicados:</strong> Normas de Documentação para Projetos de Software</p>
            </div>
        </div>
    `;
}

// Adicionar campo de aluno
function addStudentField() {
    const studentItem = document.createElement('div');
    studentItem.className = 'student-item';
    studentItem.innerHTML = `
        <input type="text" name="student-name[]" class="student-name" placeholder="Nome completo do aluno">
        <input type="text" name="student-course[]" class="student-course" placeholder="Nome do curso">
        <button type="button" class="remove-student">
            <i class="fas fa-times"></i>
        </button>
    `;

    studentsList.appendChild(studentItem);

    // Mostrar botão de remover se houver mais de um item
    const studentItems = studentsList.querySelectorAll('.student-item:not(.header)');
    if (studentItems.length > 1) {
        studentItems.forEach(item => {
            const removeBtn = item.querySelector('.remove-student');
            if (removeBtn) removeBtn.style.display = 'flex';
        });
    }

    // Event listener para remover aluno
    const removeBtn = studentItem.querySelector('.remove-student');
    removeBtn.addEventListener('click', () => {
        studentItem.remove();
        updateRemoveStudentButtons();
    });
}

// Atualizar botões de remover aluno
function updateRemoveStudentButtons() {
    const studentItems = studentsList.querySelectorAll('.student-item:not(.header)');
    studentItems.forEach(item => {
        const removeBtn = item.querySelector('.remove-student');
        if (removeBtn) {
            removeBtn.style.display = studentItems.length > 1 ? 'flex' : 'none';
        }
    });
}

// Manipular submissão do formulário de autorização
function handleAuthorizationFormSubmit(e) {
    e.preventDefault();
    
    if (!validateAuthorizationForm()) {
        showNotification('Por favor, preencha todos os campos obrigatórios', 'error');
        return;
    }
    
    // Coletar dados do formulário de autorização
    collectAuthorizationFormData();
    
    // Gerar carta de autorização
    generateAuthorizationLetter();
    
    // Mostrar resultado
    showDocumentationOutput();
    
    // Scroll para o resultado
    documentationOutput.scrollIntoView({ behavior: 'smooth' });
}

// Validar formulário de autorização
function validateAuthorizationForm() {
    const requiredFields = authorizationForm.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            showFieldError(field, 'Este campo é obrigatório');
        } else {
            clearFieldError(field);
        }
    });
    
    // Verificar se pelo menos uma autorização foi marcada
    const authorizations = authorizationForm.querySelectorAll('input[name="authorizations[]"]:checked');
    if (authorizations.length === 0) {
        showNotification('Selecione pelo menos uma opção de autorização', 'error');
        isValid = false;
    }
    
    return isValid;
}

// Coletar dados do formulário de autorização
function collectAuthorizationFormData() {
    const formDataObj = new FormData(authorizationForm);
    formData = {
        documentType: 'authorization',
        responsibleName: formDataObj.get('responsible-name'),
        responsiblePosition: formDataObj.get('responsible-position'),
        companyName: formDataObj.get('company-name'),
        companyAddress: formDataObj.get('company-address'),
        activitiesDescription: formDataObj.get('activities-description'),
        students: [],
        authorizations: [],
        local: formDataObj.get('letter-local'),
        day: formDataObj.get('letter-day'),
        month: formDataObj.get('letter-month'),
        year: formDataObj.get('letter-year'),
        otherAuthSpecify: formDataObj.get('auth-other-specify')
    };
    
    // Coletar dados dos alunos
    const studentNames = formDataObj.getAll('student-name[]');
    const studentCourses = formDataObj.getAll('student-course[]');
    formData.students = studentNames.map((name, index) => ({
        name: name.trim(),
        course: studentCourses[index]?.trim() || ''
    })).filter(student => student.name);
    
    // Coletar autorizações
    const authCheckboxes = formDataObj.getAll('authorizations[]');
    formData.authorizations = authCheckboxes;
}

// Gerar carta de autorização
function generateAuthorizationLetter() {
    const doc = createAuthorizationLetterStructure();
    documentationContent.innerHTML = doc;
}

// Criar estrutura da carta de autorização
function createAuthorizationLetterStructure() {
    const studentsList = formData.students.map(student => 
        `<li><strong>${student.name}</strong> - ${student.course}</li>`
    ).join('');
    
    const authorizationsList = formData.authorizations.map(auth => {
        if (auth === 'access-data') return 'O acesso a informações e dados que forem necessários à execução da atividade';
        if (auth === 'image-record') return 'O registro de imagem por meio de fotografias';
        if (auth === 'other') return `Outro: ${formData.otherAuthSpecify || ''}`;
        return '';
    }).filter(item => item).join('<br>');
    
    const fullDate = `${formData.day} de ${formData.month} de ${formData.year}`;
    
    return `
        <div class="authorization-letter">
            <h1>CARTA DE AUTORIZAÇÃO</h1>
            
            <div class="letter-content">
                <p>Eu, <strong>${formData.responsibleName}</strong>, ${formData.responsiblePosition} da ${formData.companyName}, empresa, organização, associação, escola, secretaria, etc, situada no endereço ${formData.companyAddress}, autorizo a realização das seguintes atividades acadêmicas extensionistas associada à disciplinas, da Universidade Estácio, sob orientação da/do Prof. Fábio Brasil:</p>
                
                <div class="activities-box">
                    <p>${formData.activitiesDescription}</p>
                </div>
                
                <p>Conforme combinado em contato prévio, as atividades acima descritas são autorizadas para os seguintes alunos:</p>
                
                <div class="students-box">
                    <ul>
                        ${studentsList}
                    </ul>
                </div>
                
                <div class="declaration-text">
                    <p>Declaro que fui informado por meio da Carta de Apresentação sobre as características e objetivos das atividades que serão realizadas na organização a qual represento e afirmo estar ciente de tratar-se de uma atividade realizada com intuito exclusivo de ensino de alunos de graduação, sem a finalidade de exercício profissional.</p>
                    <p>Desta forma, autorizo:</p>
                    <div class="authorizations-box">
                        ${authorizationsList}
                    </div>
                </div>
                
                <div class="signature-area">
                    <div class="location-date">
                        <p><strong>${formData.local}</strong>, ${fullDate}</p>
                    </div>
                    
                    <div class="signature-line">
                        <p>_______________________________________________________________</p>
                        <p><strong>${formData.responsibleName}</strong></p>
                        <p>${formData.responsiblePosition}</p>
                        <p><em>(Carimbo da empresa/organização/escola)</em></p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Adicionar campo de funcionalidade
function addFeatureField() {
    const featureItem = document.createElement('div');
    featureItem.className = 'feature-item';
    featureItem.innerHTML = `
        <input type="text" name="features[]" placeholder="Ex: Login de usuários" required>
        <button type="button" class="remove-feature">
            <i class="fas fa-times"></i>
        </button>
    `;

    featuresList.appendChild(featureItem);

    // Mostrar botão de remover se houver mais de um item
    const featureItems = featuresList.querySelectorAll('.feature-item');
    if (featureItems.length > 1) {
        featureItems.forEach(item => {
            const removeBtn = item.querySelector('.remove-feature');
            if (removeBtn) removeBtn.style.display = 'flex';
        });
    }

    // Event listener para remover funcionalidade
    const removeBtn = featureItem.querySelector('.remove-feature');
    removeBtn.addEventListener('click', () => {
        featureItem.remove();
        updateRemoveButtons();
    });
}

// Atualizar botões de remover
function updateRemoveButtons() {
    const featureItems = featuresList.querySelectorAll('.feature-item');
    featureItems.forEach(item => {
        const removeBtn = item.querySelector('.remove-feature');
        if (removeBtn) {
            removeBtn.style.display = featureItems.length > 1 ? 'flex' : 'none';
        }
    });
}

// Adicionar campo de relatório individual
function addReportField() {
    const reportItem = document.createElement('div');
    reportItem.className = 'team-report-item';
    reportItem.innerHTML = `
        <div class="report-header">
            <input type="text" name="memberName[]" placeholder="Nome do Integrante" class="member-name">
            <button type="button" class="remove-report">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="report-content">
            <div class="form-group">
                <label>Período do Relatório</label>
                <div class="period-inputs">
                    <input type="date" name="reportStartDate[]" class="report-start-date">
                    <span>até</span>
                    <input type="date" name="reportEndDate[]" class="report-end-date">
                </div>
            </div>
            <div class="form-group">
                <label>Tarefas Realizadas</label>
                <textarea name="tasksDone[]" rows="3" placeholder="Descreva as tarefas completadas e tempo investido"></textarea>
            </div>
            <div class="form-group">
                <label>Desafios Encontrados</label>
                <textarea name="challenges[]" rows="2" placeholder="Obstáculos e como foram superados"></textarea>
            </div>
            <div class="form-group">
                <label>Aprendizados</label>
                <textarea name="learnings[]" rows="2" placeholder="Conhecimentos adquiridos"></textarea>
            </div>
            <div class="form-group">
                <label>Próximos Passos</label>
                <textarea name="nextSteps[]" rows="2" placeholder="Planejamento das próximas atividades"></textarea>
            </div>
        </div>
    `;

    teamReportsList.appendChild(reportItem);

    // Mostrar botão de remover se houver mais de um item
    const reportItems = teamReportsList.querySelectorAll('.team-report-item');
    if (reportItems.length > 1) {
        reportItems.forEach(item => {
            const removeBtn = item.querySelector('.remove-report');
            if (removeBtn) removeBtn.style.display = 'flex';
        });
    }

    // Event listener para remover relatório
    const removeBtn = reportItem.querySelector('.remove-report');
    removeBtn.addEventListener('click', () => {
        reportItem.remove();
        updateRemoveReportButtons();
    });
}

// Atualizar botões de remover relatório
function updateRemoveReportButtons() {
    const reportItems = teamReportsList.querySelectorAll('.team-report-item');
    reportItems.forEach(item => {
        const removeBtn = item.querySelector('.remove-report');
        if (removeBtn) {
            removeBtn.style.display = reportItems.length > 1 ? 'flex' : 'none';
        }
    });
}

// Adicionar campo de membro do projeto
function addMemberField() {
    const memberItem = document.createElement('div');
    memberItem.className = 'team-item';
    memberItem.innerHTML = `
        <input type="text" name="memberName[]" placeholder="Nome" required>
        <input type="text" name="memberRole[]" placeholder="Função" required>
        <input type="email" name="memberEmail[]" placeholder="E-mail" required>
        <button type="button" class="remove-member">
            <i class="fas fa-times"></i>
        </button>
    `;

    teamList.appendChild(memberItem);

    // Mostrar botão de remover se houver mais de um item
    const memberItems = teamList.querySelectorAll('.team-item');
    if (memberItems.length > 1) {
        memberItems.forEach(item => {
            const removeBtn = item.querySelector('.remove-member');
            if (removeBtn) removeBtn.style.display = 'flex';
        });
    }

    // Event listener para remover membro
    const removeBtn = memberItem.querySelector('.remove-member');
    removeBtn.addEventListener('click', () => {
        memberItem.remove();
        updateRemoveMemberButtons();
    });
}

// Atualizar botões de remover membro
function updateRemoveMemberButtons() {
    const memberItems = teamList.querySelectorAll('.team-item');
    memberItems.forEach(item => {
        const removeBtn = item.querySelector('.remove-member');
        if (removeBtn) {
            removeBtn.style.display = memberItems.length > 1 ? 'flex' : 'none';
        }
    });
}

// Configurar validação do formulário
function setupFormValidation() {
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        field.addEventListener('blur', validateField);
        field.addEventListener('input', clearFieldError);
    });
}

// Validar campo
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'Este campo é obrigatório');
        return false;
    }
    
    clearFieldError(field);
    return true;
}

// Mostrar erro no campo
function showFieldError(field, message) {
    clearFieldError(field);
    
    field.style.borderColor = '#dc3545';
    field.style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.1)';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.color = '#dc3545';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

// Limpar erro do campo
function clearFieldError(field) {
    field.style.borderColor = '';
    field.style.boxShadow = '';
    
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Validar formulário completo
function validateForm() {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField({ target: field })) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Manipular submissão do formulário
function handleFormSubmit(e) {
    e.preventDefault();
    
    if (!validateForm()) {
        showNotification('Por favor, preencha todos os campos obrigatórios', 'error');
        return;
    }
    
    // Coletar dados do formulário
    collectFormData();
    
    // Gerar documentação
    generateDocumentation();
    
    // Mostrar resultado
    showDocumentationOutput();
    
    // Scroll para o resultado
    documentationOutput.scrollIntoView({ behavior: 'smooth' });
}

// Coletar dados do formulário
function collectFormData() {
    const formDataObj = new FormData(form);
    formData = {};
    
    for (let [key, value] of formDataObj.entries()) {
        if (key === 'features[]') {
            if (!formData.features) formData.features = [];
            if (value.trim()) formData.features.push(value.trim());
        } else if (key === 'platforms') {
            if (!formData.platforms) formData.platforms = [];
            formData.platforms.push(value);
        } else if (key.startsWith('member')) {
            // Ignorar campos de membro aqui, serão processados separadamente
            continue;
        } else {
            formData[key] = value.trim();
        }
    }
    
    // Adicionar tipo de projeto
    formData.projectType = selectedProjectType;
    
    // Coletar dados dos membros da equipe
    const memberNames = formDataObj.getAll('memberName[]');
    const memberRoles = formDataObj.getAll('memberRole[]');
    const memberEmails = formDataObj.getAll('memberEmail[]');
    formData.teamMembers = memberNames.map((name, index) => ({
        name: name.trim(),
        role: memberRoles[index]?.trim() || '',
        email: memberEmails[index]?.trim() || ''
    }));

    // Coletar dados dos relatórios individuais
    const reportMemberNames = formDataObj.getAll('memberName[]');
    const reportStartDates = formDataObj.getAll('reportStartDate[]');
    const reportEndDates = formDataObj.getAll('reportEndDate[]');
    const tasksDone = formDataObj.getAll('tasksDone[]');
    const challenges = formDataObj.getAll('challenges[]');
    const learnings = formDataObj.getAll('learnings[]');
    const nextSteps = formDataObj.getAll('nextSteps[]');
    
    formData.teamReports = reportMemberNames.map((name, index) => ({
        memberName: name.trim(),
        startDate: reportStartDates[index] || '',
        endDate: reportEndDates[index] || '',
        tasksDone: tasksDone[index]?.trim() || '',
        challenges: challenges[index]?.trim() || '',
        learnings: learnings[index]?.trim() || '',
        nextSteps: nextSteps[index]?.trim() || ''
    })).filter(report => report.memberName);

    // Coletar dados do relatório coletivo
    formData.collectiveReport = {
        startDate: formDataObj.get('collectiveStartDate') || '',
        endDate: formDataObj.get('collectiveEndDate') || '',
        executiveSummary: formDataObj.get('executiveSummary')?.trim() || '',
        projectMetrics: formDataObj.get('projectMetrics')?.trim() || '',
        featuresStatus: formDataObj.get('featuresStatus')?.trim() || '',
        nextObjectives: formDataObj.get('nextObjectives')?.trim() || '',
        lessonsLearned: formDataObj.get('lessonsLearned')?.trim() || ''
    };
}

// Gerar documentação
function generateDocumentation() {
    const doc = createDocumentationStructure();
    documentationContent.innerHTML = doc;
}

// Criar estrutura da documentação
function createDocumentationStructure() {
    const projectTypeText = getProjectTypeText(formData.projectType);
    const platformsText = getPlatformsText(formData.platforms);
    const featuresList = createFeaturesList(formData.features);
    const teamMembersList = createTeamMembersList(formData.teamMembers);
    const teamReportsList = createTeamReportsList(formData.teamReports);
    const collectiveReportSection = createCollectiveReportSection(formData.collectiveReport);
    
    return `
        <h1>${formData.projectName || 'Documentação do Projeto'}</h1>
        
        <div class="info-box">
            <p><strong>Versão:</strong> ${formData.version || '1.0.0'}</p>
            <p><strong>Tipo:</strong> ${projectTypeText}</p>
            ${platformsText ? `<p><strong>Plataformas:</strong> ${platformsText}</p>` : ''}
        </div>
        
        <h2>Descrição</h2>
        <p>${formData.projectDescription || 'Descrição do projeto não fornecida.'}</p>
        
        <h2>Público-Alvo</h2>
        <p>${formData.targetAudience || 'Público-alvo não especificado.'}</p>
        
        <h2>Funcionalidades Principais</h2>
        ${featuresList}
        
        ${formData.technologies ? `
        <h2>Informações Técnicas</h2>
        <h3>Tecnologias Utilizadas</h3>
        <p>${formData.technologies}</p>
        ` : ''}
        
        ${selectedProjectType === 'website-app' ? `
        <h2>Funcionalidades do Aplicativo de Website</h2>
        ${createWebsiteAppFeaturesSection()}
        
        <h2>Interface do Usuário</h2>
        ${createUserInterfaceSection()}
        
        <h2>Performance e Otimização</h2>
        ${createPerformanceSection()}
        
        <h2>Segurança</h2>
        ${createSecuritySection()}
        
        <h2>Integrações e APIs</h2>
        ${createApiIntegrationSection()}
        
        <h2>Testes e Qualidade</h2>
        ${createTestingSection()}
        
        <h2>Manutenção e Monitoramento</h2>
        ${createMaintenanceSection()}
        ` : ''}
        
        ${formData.requirements ? `
        <h2>Requisitos do Sistema</h2>
        <div class="code-block">
            ${formData.requirements}
        </div>
        ` : ''}
        
        ${formData.installationSteps ? `
        <h2>Instalação e Configuração</h2>
        <div class="code-block">
            ${formData.installationSteps}
        </div>
        ` : ''}
        
        ${formData.usageInstructions ? `
        <h2>Como Usar</h2>
        <p>${formData.usageInstructions}</p>
        ` : ''}
        
        ${formData.apiEndpoints ? `
        <h2>API</h2>
        <div class="code-block">
            ${formData.apiEndpoints}
        </div>
        ` : ''}
        
        ${formData.deploymentSteps ? `
        <h2>Deploy e Publicação</h2>
        <div class="code-block">
            ${formData.deploymentSteps}
        </div>
        ` : ''}
        
        ${teamMembersList ? `
        <h2>Membros da Equipe</h2>
        ${teamMembersList}
        ` : ''}
        
        ${teamReportsList ? `
        <h2>Relatórios Individuais da Equipe</h2>
        ${teamReportsList}
        ` : ''}
        
        ${collectiveReportSection ? `
        <h2>Relatório Coletivo do Projeto</h2>
        ${collectiveReportSection}
        ` : ''}
        
        ${formData.contactInfo ? `
        <h2>Contato e Suporte</h2>
        <p>${formData.contactInfo}</p>
        ` : ''}
        
        ${uploadedImagesList.length > 0 ? `
        <h2>Imagens do Projeto</h2>
        ${createImageGallery()}
        ` : ''}
        
        <div class="info-box">
            <p><strong>Data de Geração:</strong> ${new Date().toLocaleDateString('pt-BR')}</p>
            <p><strong>Gerado por:</strong> DocGen - Gerador de Documentação</p>
        </div>
    `;
}

// Criar galeria de imagens
function createImageGallery() {
    return `
        <div class="image-gallery">
            ${uploadedImagesList.map(image => `
                <div class="image-gallery-item">
                    <img src="${image.dataUrl}" alt="${image.fileName}">
                    <div class="caption">
                        <p>${image.fileName}</p>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// Obter texto do tipo de projeto
function getProjectTypeText(type) {
    const types = {
        'mobile': 'Aplicativo Móvel',
        'web': 'Website',
        'both': 'Aplicativo Móvel e Website',
        'website-app': 'Aplicativo de Website'
    };
    return types[type] || 'Projeto';
}

// Criar seção de funcionalidades do aplicativo de website
function createWebsiteAppFeaturesSection() {
    const formDataObj = new FormData(form);
    const webTechnologies = formDataObj.get('webTechnologies');
    const frameworks = formDataObj.get('frameworks');
    const database = formDataObj.get('database');
    const hosting = formDataObj.get('hosting');
    
    return `
        <div class="website-app-section">
            ${webTechnologies ? `
            <h3>Tecnologias Web</h3>
            <p>${webTechnologies}</p>
            ` : ''}
            
            ${frameworks ? `
            <h3>Frameworks e Bibliotecas</h3>
            <p>${frameworks}</p>
            ` : ''}
            
            ${database ? `
            <h3>Banco de Dados</h3>
            <p>${database}</p>
            ` : ''}
            
            ${hosting ? `
            <h3>Hospedagem e Deploy</h3>
            <p>${hosting}</p>
            ` : ''}
        </div>
    `;
}

// Criar seção de interface do usuário
function createUserInterfaceSection() {
    const formDataObj = new FormData(form);
    const designSystem = formDataObj.get('designSystem');
    const responsiveDesign = formDataObj.get('responsiveDesign');
    const accessibility = formDataObj.get('accessibility');
    const browsers = formDataObj.get('browsers');
    
    return `
        <div class="ui-section">
            ${designSystem ? `
            <h3>Sistema de Design</h3>
            <p>${designSystem}</p>
            ` : ''}
            
            ${responsiveDesign ? `
            <h3>Design Responsivo</h3>
            <p>${responsiveDesign}</p>
            ` : ''}
            
            ${accessibility ? `
            <h3>Acessibilidade</h3>
            <p>${accessibility}</p>
            ` : ''}
            
            ${browsers ? `
            <h3>Navegadores Suportados</h3>
            <p>${browsers}</p>
            ` : ''}
        </div>
    `;
}

// Criar seção de performance
function createPerformanceSection() {
    const formDataObj = new FormData(form);
    const optimization = formDataObj.get('optimization');
    const performanceMetrics = formDataObj.get('performanceMetrics');
    const seo = formDataObj.get('seo');
    
    return `
        <div class="performance-section">
            ${optimization ? `
            <h3>Técnicas de Otimização</h3>
            <p>${optimization}</p>
            ` : ''}
            
            ${performanceMetrics ? `
            <h3>Métricas de Performance</h3>
            <p>${performanceMetrics}</p>
            ` : ''}
            
            ${seo ? `
            <h3>SEO (Otimização para Motores de Busca)</h3>
            <p>${seo}</p>
            ` : ''}
        </div>
    `;
}

// Criar seção de segurança
function createSecuritySection() {
    const formDataObj = new FormData(form);
    const authentication = formDataObj.get('authentication');
    const dataProtection = formDataObj.get('dataProtection');
    const compliance = formDataObj.get('compliance');
    
    return `
        <div class="security-section">
            ${authentication ? `
            <h3>Autenticação e Autorização</h3>
            <p>${authentication}</p>
            ` : ''}
            
            ${dataProtection ? `
            <h3>Proteção de Dados</h3>
            <p>${dataProtection}</p>
            ` : ''}
            
            ${compliance ? `
            <h3>Conformidade e Compliance</h3>
            <p>${compliance}</p>
            ` : ''}
        </div>
    `;
}

// Criar seção de integrações e APIs
function createApiIntegrationSection() {
    const formDataObj = new FormData(form);
    const externalApis = formDataObj.get('externalApis');
    const webhooks = formDataObj.get('webhooks');
    const thirdParty = formDataObj.get('thirdParty');
    
    return `
        <div class="api-section">
            ${externalApis ? `
            <h3>APIs Externas</h3>
            <p>${externalApis}</p>
            ` : ''}
            
            ${webhooks ? `
            <h3>Webhooks</h3>
            <p>${webhooks}</p>
            ` : ''}
            
            ${thirdParty ? `
            <h3>Integrações de Terceiros</h3>
            <p>${thirdParty}</p>
            ` : ''}
        </div>
    `;
}

// Criar seção de testes
function createTestingSection() {
    const formDataObj = new FormData(form);
    const testingTypes = formDataObj.get('testingTypes');
    const testingTools = formDataObj.get('testingTools');
    const cicd = formDataObj.get('cicd');
    
    return `
        <div class="testing-section">
            ${testingTypes ? `
            <h3>Tipos de Teste</h3>
            <p>${testingTypes}</p>
            ` : ''}
            
            ${testingTools ? `
            <h3>Ferramentas de Teste</h3>
            <p>${testingTools}</p>
            ` : ''}
            
            ${cicd ? `
            <h3>CI/CD Pipeline</h3>
            <p>${cicd}</p>
            ` : ''}
        </div>
    `;
}

// Criar seção de manutenção
function createMaintenanceSection() {
    const formDataObj = new FormData(form);
    const monitoring = formDataObj.get('monitoring');
    const backupStrategy = formDataObj.get('backupStrategy');
    const updateProcess = formDataObj.get('updateProcess');
    
    return `
        <div class="maintenance-section">
            ${monitoring ? `
            <h3>Monitoramento e Logging</h3>
            <p>${monitoring}</p>
            ` : ''}
            
            ${backupStrategy ? `
            <h3>Estratégia de Backup</h3>
            <p>${backupStrategy}</p>
            ` : ''}
            
            ${updateProcess ? `
            <h3>Processo de Atualização</h3>
            <p>${updateProcess}</p>
            ` : ''}
        </div>
    `;
}

// Obter texto das plataformas
function getPlatformsText(platforms) {
    if (!platforms || platforms.length === 0) return '';
    
    const platformNames = {
        'ios': 'iOS',
        'android': 'Android',
        'web': 'Web',
        'desktop': 'Desktop'
    };
    
    return platforms.map(p => platformNames[p] || p).join(', ');
}

// Criar lista de funcionalidades
function createFeaturesList(features) {
    if (!features || features.length === 0) {
        return '<p>Nenhuma funcionalidade especificada.</p>';
    }
    
    const featuresHtml = features.map(feature => `<li>${feature}</li>`).join('');
    return `<ul>${featuresHtml}</ul>`;
}

// Criar lista de membros da equipe
function createTeamMembersList(members) {
    if (!members || members.length === 0) {
        return '<p>Nenhum membro da equipe especificado.</p>';
    }
    
    const membersHtml = members.map(member => {
        return `
            <div class="member-item">
                <p><strong>Nome:</strong> ${member.name}</p>
                <p><strong>Função:</strong> ${member.role}</p>
                <p><strong>E-mail:</strong> ${member.email}</p>
            </div>
        `;
    }).join('');
    
    return `<div class="members-list">${membersHtml}</div>`;
}

// Criar lista de relatórios individuais
function createTeamReportsList(reports) {
    if (!reports || reports.length === 0) {
        return '<p>Nenhum relatório individual especificado.</p>';
    }
    
    const reportsHtml = reports.map(report => {
        const period = report.startDate && report.endDate 
            ? `${formatDate(report.startDate)} a ${formatDate(report.endDate)}`
            : 'Período não especificado';
            
        return `
            <div class="report-item">
                <h3>${report.memberName}</h3>
                <p><strong>Período:</strong> ${period}</p>
                
                ${report.tasksDone ? `
                <h4>Tarefas Realizadas</h4>
                <p>${report.tasksDone}</p>
                ` : ''}
                
                ${report.challenges ? `
                <h4>Desafios Encontrados</h4>
                <p>${report.challenges}</p>
                ` : ''}
                
                ${report.learnings ? `
                <h4>Aprendizados</h4>
                <p>${report.learnings}</p>
                ` : ''}
                
                ${report.nextSteps ? `
                <h4>Próximos Passos</h4>
                <p>${report.nextSteps}</p>
                ` : ''}
            </div>
        `;
    }).join('');
    
    return `<div class="reports-list">${reportsHtml}</div>`;
}

// Criar seção de relatório coletivo
function createCollectiveReportSection(collectiveReport) {
    if (!collectiveReport || (!collectiveReport.executiveSummary && !collectiveReport.projectMetrics)) {
        return '<p>Nenhum relatório coletivo especificado.</p>';
    }
    
    const period = collectiveReport.startDate && collectiveReport.endDate 
        ? `${formatDate(collectiveReport.startDate)} a ${formatDate(collectiveReport.endDate)}`
        : 'Período não especificado';
    
    return `
        <div class="collective-report">
            <p><strong>Período:</strong> ${period}</p>
            
            ${collectiveReport.executiveSummary ? `
            <h3>Resumo Executivo</h3>
            <p>${collectiveReport.executiveSummary}</p>
            ` : ''}
            
            ${collectiveReport.projectMetrics ? `
            <h3>Métricas do Projeto</h3>
            <p>${collectiveReport.projectMetrics}</p>
            ` : ''}
            
            ${collectiveReport.featuresStatus ? `
            <h3>Status das Funcionalidades</h3>
            <p>${collectiveReport.featuresStatus}</p>
            ` : ''}
            
            ${collectiveReport.nextObjectives ? `
            <h3>Próximos Objetivos</h3>
            <p>${collectiveReport.nextObjectives}</p>
            ` : ''}
            
            ${collectiveReport.lessonsLearned ? `
            <h3>Lições Aprendidas</h3>
            <p>${collectiveReport.lessonsLearned}</p>
            ` : ''}
        </div>
    `;
}

// Formatar data
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
}

// Mostrar saída da documentação
function showDocumentationOutput() {
    documentationOutput.style.display = 'block';
    showNotification('Documentação gerada com sucesso!', 'success');
}

// Baixar documentação como PDF
async function downloadDocumentation() {
    const content = documentationContent;
    let docTitle;
    
    if (formData.documentType === 'authorization') {
        docTitle = `carta_autorizacao_${formData.companyName?.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'documento'}`;
    } else if (formData.documentType === 'standards') {
        docTitle = 'documentacao_padrao_software';
    } else {
        docTitle = formData.projectName || 'documentacao';
    }
    
    try {
        showNotification('Gerando PDF...', 'info');
        
        // Configurar jsPDF
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });
        
        // Adicionar fonte personalizada
        pdf.setFont('helvetica');
        
        // Coletar todas as seções do conteúdo
        const sections = content.querySelectorAll('h1, h2, h3, .info-box, .code-block, .image-gallery, .members-list, .standards-section, .website-app-section, .ui-section, .performance-section, .security-section, .api-section, .testing-section, .maintenance-section, .authorization-letter');
        
        let currentY = 20; // Posição Y inicial
        const pageHeight = pdf.internal.pageSize.height;
        const pageWidth = pdf.internal.pageSize.width;
        const margin = 20;
        const contentWidth = pageWidth - (margin * 2);
        const lineHeight = 7;
        
        // Função para verificar se precisa de nova página
        function checkPageBreak(requiredHeight) {
            if (currentY + requiredHeight > pageHeight - margin) {
                pdf.addPage();
                currentY = margin;
                return true;
            }
            return false;
        }
        
        // Função para adicionar texto com quebra automática
        function addText(text, fontSize = 12, fontStyle = 'normal', color = [0, 0, 0]) {
            pdf.setFontSize(fontSize);
            pdf.setFont('helvetica', fontStyle);
            pdf.setTextColor(...color);
            
            const lines = pdf.splitTextToSize(text, contentWidth);
            const textHeight = lines.length * lineHeight;
            
            checkPageBreak(textHeight);
            
            lines.forEach(line => {
                pdf.text(line, margin, currentY);
                currentY += lineHeight;
            });
            
            currentY += 3; // Espaço após parágrafo
        }
        
        // Função para adicionar título
        function addTitle(text, level = 1) {
            const fontSize = level === 1 ? 20 : level === 2 ? 16 : 14;
            const fontStyle = level === 1 ? 'bold' : 'bold';
            
            checkPageBreak(fontSize + 10);
            
            pdf.setFontSize(fontSize);
            pdf.setFont('helvetica', fontStyle);
            pdf.setTextColor(51, 51, 51);
            
            if (level === 1) {
                pdf.text(text, pageWidth / 2, currentY, { align: 'center' });
                currentY += fontSize + 10;
                
                // Adicionar linha decorativa para h1
                pdf.setDrawColor(102, 126, 234);
                pdf.setLineWidth(0.5);
                pdf.line(margin, currentY, pageWidth - margin, currentY);
                currentY += 10;
            } else if (level === 2) {
                // Adicionar linha lateral para h2
                pdf.setDrawColor(102, 126, 234);
                pdf.setLineWidth(2);
                pdf.line(margin, currentY - 5, margin + 4, currentY - 5);
                pdf.text(text, margin + 10, currentY);
                currentY += fontSize + 8;
            } else {
                pdf.text(text, margin, currentY);
                currentY += fontSize + 6;
            }
        }
        
        // Função para adicionar caixa de informação
        function addInfoBox(content) {
            checkPageBreak(30);
            
            pdf.setFillColor(248, 249, 250);
            pdf.setDrawColor(233, 236, 239);
            pdf.setLineWidth(1);
            
            const boxHeight = 25;
            pdf.rect(margin, currentY, contentWidth, boxHeight, 'FD');
            
            pdf.setFontSize(11);
            pdf.setFont('helvetica', 'normal');
            pdf.setTextColor(51, 51, 51);
            
            const lines = pdf.splitTextToSize(content, contentWidth - 10);
            lines.forEach((line, index) => {
                pdf.text(line, margin + 5, currentY + 8 + (index * 6));
            });
            
            currentY += boxHeight + 10;
        }
        
        // Função para adicionar código
        function addCodeBlock(content) {
            checkPageBreak(40);
            
            pdf.setFillColor(45, 55, 72);
            pdf.setDrawColor(45, 55, 72);
            
            const lines = pdf.splitTextToSize(content, contentWidth - 10);
            const boxHeight = lines.length * 6 + 15;
            
            pdf.rect(margin, currentY, contentWidth, boxHeight, 'FD');
            
            pdf.setFontSize(10);
            pdf.setFont('courier', 'normal');
            pdf.setTextColor(226, 232, 240);
            
            lines.forEach((line, index) => {
                pdf.text(line, margin + 5, currentY + 10 + (index * 6));
            });
            
            currentY += boxHeight + 10;
        }
        
        // Função para adicionar imagem
        async function addImage(imgSrc, caption = '') {
            try {
                const img = new Image();
                img.crossOrigin = 'anonymous';
                
                await new Promise((resolve, reject) => {
                    img.onload = resolve;
                    img.onerror = reject;
                    img.src = imgSrc;
                });
                
                const maxWidth = contentWidth;
                const maxHeight = 100;
                
                let width = img.width;
                let height = img.height;
                
                // Calcular proporção
                if (width > maxWidth) {
                    height = (maxWidth / width) * height;
                    width = maxWidth;
                }
                
                if (height > maxHeight) {
                    width = (maxHeight / height) * width;
                    height = maxHeight;
                }
                
                checkPageBreak(height + 30);
                
                // Converter imagem para formato PDF
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                
                const imgData = canvas.toDataURL('image/jpeg', 0.8);
                pdf.addImage(imgData, 'JPEG', margin, currentY, width, height);
                
                currentY += height + 10;
                
                if (caption) {
                    pdf.setFontSize(10);
                    pdf.setFont('helvetica', 'italic');
                    pdf.setTextColor(102, 102, 102);
                    pdf.text(caption, margin, currentY);
                    currentY += 8;
                }
                
                currentY += 10;
                
            } catch (error) {
                console.error('Erro ao adicionar imagem:', error);
            }
        }
        
        // Processar cada seção
        for (const section of sections) {
            switch (section.tagName.toLowerCase()) {
                case 'h1':
                    addTitle(section.textContent, 1);
                    break;
                    
                case 'h2':
                    addTitle(section.textContent, 2);
                    break;
                    
                case 'h3':
                    addTitle(section.textContent, 3);
                    break;
                    
                case 'p':
                    if (section.textContent.trim()) {
                        addText(section.textContent);
                    }
                    break;
                    
                case 'div':
                    if (section.classList.contains('info-box')) {
                        addInfoBox(section.textContent);
                    } else if (section.classList.contains('code-block')) {
                        addCodeBlock(section.textContent);
                    } else if (section.classList.contains('image-gallery')) {
                        const images = section.querySelectorAll('img');
                        for (const img of images) {
                            await addImage(img.src, img.alt || '');
                        }
                    }
                    break;
            }
        }
        
        // Salvar PDF
        pdf.save(`${docTitle}.pdf`);
        
        let documentType = 'Documentação';
        if (formData.documentType === 'authorization') documentType = 'Carta de Autorização';
        if (formData.documentType === 'standards') documentType = 'Documentação Padrão';
        
        showNotification(`${documentType} PDF gerada com sucesso!`, 'success');
        
    } catch (error) {
        console.error('Erro ao gerar PDF:', error);
        showNotification('Erro ao gerar PDF. Tente novamente.', 'error');
        
        // Fallback para HTML se PDF falhar
        downloadHTMLFallback();
    }
}

// Fallback para download HTML se PDF falhar
function downloadHTMLFallback() {
    const content = documentationContent.innerHTML;
    let docTitle;
    
    if (formData.documentType === 'authorization') {
        docTitle = `carta_autorizacao_${formData.companyName?.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'documento'}`;
    } else if (formData.documentType === 'standards') {
        docTitle = 'documentacao_padrao_software';
    } else {
        docTitle = formData.projectName || 'documentacao';
    }
    
    // Criar blob com o conteúdo
    const blob = new Blob([`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>${docTitle}</title>
            <style>
                body { font-family: ${formData.documentType === 'authorization' ? "'Times New Roman', serif" : formData.documentType === 'standards' ? "'Inter', sans-serif" : "Arial, sans-serif"}; line-height: 1.6; margin: 40px; }
                h1 { color: #333; border-bottom: 3px solid #667eea; padding-bottom: 10px; text-align: ${formData.documentType === 'authorization' ? 'center' : formData.documentType === 'standards' ? 'center' : 'left'}; }
                h2 { color: #444; margin: 30px 0 15px 0; padding-left: 15px; border-left: 4px solid #667eea; }
                h3 { color: #555; margin: 20px 0 10px 0; }
                .info-box { background: #f8f9fa; border: 1px solid #e9ecef; border-radius: 8px; padding: 15px; margin: 20px 0; }
                .code-block { background: #2d3748; color: #e2e8f0; padding: 15px; border-radius: 8px; font-family: monospace; margin: 15px 0; }
                ul { margin: 15px 0; padding-left: 20px; }
                li { margin-bottom: 5px; }
                .members-list { margin: 15px 0; }
                .member-item { background: #f1f3f5; border: 1px solid #dee2e6; border-radius: 8px; padding: 10px; margin-bottom: 10px; }
                .image-gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; margin: 20px 0; }
                .image-gallery-item { border: 2px solid #e9ecef; border-radius: 12px; overflow: hidden; background: white; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); }
                .image-gallery-item img { width: 100%; height: 200px; object-fit: cover; display: block; }
                .image-gallery-item .caption { padding: 15px; background: #f8f9fa; border-top: 2px solid #e9ecef; }
                .image-gallery-item .caption p { margin: 0; color: #333; font-weight: 500; text-align: center; }
                ${formData.documentType === 'authorization' ? `
                .authorization-letter { background: white; border-radius: 12px; padding: 40px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); max-width: 800px; margin: 0 auto; font-family: 'Times New Roman', serif; line-height: 1.8; color: #333; }
                .authorization-letter h1 { text-align: center; font-size: 2rem; font-weight: bold; margin-bottom: 40px; color: #333; text-transform: uppercase; letter-spacing: 2px; }
                .letter-content p { margin-bottom: 20px; text-align: justify; font-size: 1.1rem; }
                .activities-box { background: #f8f9fa; border: 2px solid #e9ecef; border-radius: 8px; padding: 20px; margin: 25px 0; }
                .activities-box p { margin: 0; font-style: italic; }
                .students-box { background: #f0f8ff; border: 2px solid #667eea; border-radius: 8px; padding: 20px; margin: 25px 0; }
                .students-box ul { margin: 0; padding-left: 20px; }
                .students-box li { margin-bottom: 10px; font-size: 1.1rem; }
                .declaration-text { background: #fff8dc; border: 2px solid #daa520; border-radius: 8px; padding: 20px; margin: 25px 0; }
                .authorizations-box { background: #f0fff0; border: 2px solid #28a745; border-radius: 8px; padding: 15px; margin: 15px 0; }
                .signature-area { margin-top: 50px; text-align: center; }
                .location-date { margin-bottom: 40px; }
                .location-date p { font-size: 1.2rem; font-weight: bold; text-align: center; }
                .signature-line { border-top: 2px solid #333; padding-top: 20px; max-width: 400px; margin: 0 auto; }
                .signature-line p { margin: 5px 0; font-size: 1rem; }
                .signature-line em { font-size: 0.9rem; color: #666; }
                ` : ''}
                ${formData.documentType === 'standards' ? `
                .standards-documentation { background: white; border-radius: 12px; padding: 40px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); max-width: 900px; margin: 0 auto; font-family: 'Inter', sans-serif; line-height: 1.7; color: #333; }
                .standards-documentation h1 { text-align: center; font-size: 2.2rem; font-weight: bold; margin-bottom: 40px; color: #667eea; text-transform: uppercase; letter-spacing: 1px; }
                .standards-documentation h2 { color: #333; font-size: 1.6rem; font-weight: 600; margin: 35px 0 20px 0; padding-left: 15px; border-left: 4px solid #667eea; background: #f8f9fa; padding: 15px; border-radius: 0 8px 8px 0; }
                .standards-documentation h3 { color: #495057; font-size: 1.3rem; font-weight: 600; margin: 25px 0 15px 0; }
                .standards-section { background: #f8f9fa; border: 2px solid #e9ecef; border-radius: 12px; padding: 25px; margin: 30px 0; }
                .standards-section h3 { color: #667eea; margin-bottom: 20px; font-size: 1.4rem; }
                .standards-section-content { background: white; padding: 20px; border-radius: 8px; border: 1px solid #dee2e6; }
                .standards-section-content p { margin-bottom: 15px; line-height: 1.8; }
                .standards-section-content p:last-child { margin-bottom: 0; }
                .standards-section-content ul { margin: 15px 0; padding-left: 25px; }
                .standards-section-content li { margin-bottom: 10px; line-height: 1.7; }
                ` : ''}
            </style>
        </head>
        <body>
            ${content}
        </body>
        </html>
    `], { type: 'text/html' });
    
    // Criar link de download
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${docTitle}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    let documentType = 'Documentação';
    if (formData.documentType === 'authorization') documentType = 'Carta de Autorização';
    if (formData.documentType === 'standards') documentType = 'Documentação Padrão';
    
    showNotification(`${documentType} HTML baixada como fallback`, 'info');
}

// Copiar documentação
function copyDocumentation() {
    const content = documentationContent.innerText;
    
    navigator.clipboard.writeText(content).then(() => {
        let documentType = 'Documentação';
        if (formData.documentType === 'authorization') documentType = 'Carta de Autorização';
        if (formData.documentType === 'standards') documentType = 'Documentação Padrão';
        
        showNotification(`${documentType} copiada para a área de transferência!`, 'success');
    }).catch(() => {
        // Fallback para navegadores mais antigos
        const textArea = document.createElement('textarea');
        textArea.value = content;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        let documentType = 'Documentação';
        if (formData.documentType === 'authorization') documentType = 'Carta de Autorização';
        if (formData.documentType === 'standards') documentType = 'Documentação Padrão';
        
        showNotification(`${documentType} copiada para a área de transferência!`, 'success');
    });
}

// Resetar formulário
function resetForm() {
    // Resetar formulário ativo
    if (selectedDocumentType === 'project' && form) {
        form.reset();
    } else if (selectedDocumentType === 'authorization' && authorizationForm) {
        authorizationForm.reset();
    } else if (selectedDocumentType === 'standards' && standardsForm) {
        standardsForm.reset();
    }
    
    documentationOutput.style.display = 'none';
    
    // Limpar imagens
    uploadedImagesList = [];
    if (uploadedImages) {
        uploadedImages.innerHTML = '';
    }
    
    // Limpar listas dinâmicas
    if (selectedDocumentType === 'project') {
        // Limpar lista de funcionalidades
        const featureItems = featuresList.querySelectorAll('.feature-item');
        featureItems.forEach((item, index) => {
            if (index > 0) item.remove();
        });
        
        // Limpar lista de membros
        const memberItems = teamList.querySelectorAll('.team-item');
        memberItems.forEach((item, index) => {
            if (index > 0) item.remove();
        });
        
        // Limpar lista de relatórios
        const reportItems = teamReportsList.querySelectorAll('.team-report-item');
        reportItems.forEach((item, index) => {
            if (index > 0) item.remove();
        });
    } else if (selectedDocumentType === 'authorization') {
        // Limpar lista de alunos
        const studentItems = studentsList.querySelectorAll('.student-item:not(.header)');
        studentItems.forEach((item, index) => {
            if (index > 0) item.remove();
        });
    }
    // Não há listas dinâmicas para limpar no formulário de normas
    
    // Voltar para o primeiro wizard
    selectedDocumentType = 'project';
    documentTypeButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.document === 'project');
    });
    
    projectWizard.style.display = 'block';
    authorizationWizard.style.display = 'none';
    standardsWizard.style.display = 'none';
    
    showNotification('Formulário resetado com sucesso!', 'success');
}

// Mostrar notificação
function showNotification(message, type = 'info') {
    // Remover notificação anterior se existir
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Criar nova notificação
    const notificationElement = document.createElement('div');
    notificationElement.className = `notification ${type}`;
    notificationElement.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Adicionar ao DOM
    document.body.appendChild(notificationElement);
    
    // Remover automaticamente após 5 segundos
    setTimeout(() => {
        if (notificationElement.parentNode) {
            notificationElement.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                if (notificationElement.parentNode) {
                    notificationElement.remove();
                }
            }, 300);
        }
    }, 3000);
    
    // Animação de entrada
    setTimeout(() => {
        notificationElement.classList.add('show');
    }, 100);
}

// Adicionar estilos de animação para notificações
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Melhorar UX com feedback visual
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar efeito de loading no botão de submit
    const submitBtn = form.querySelector('button[type="submit"]');
    
    form.addEventListener('submit', function() {
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="loading"></span> Gerando...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
    
    // Adicionar efeito de hover nos campos
    const formFields = form.querySelectorAll('input, textarea');
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            this.parentNode.style.transform = 'scale(1.02)';
        });
        
        field.addEventListener('blur', function() {
            this.parentNode.style.transform = 'scale(1)';
        });
    });
});

// Adicionar funcionalidade de auto-save (opcional)
let autoSaveTimeout;
form.addEventListener('input', function() {
    clearTimeout(autoSaveTimeout);
    autoSaveTimeout = setTimeout(() => {
        // Salvar dados no localStorage
        const formData = new FormData(form);
        const data = {};
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        localStorage.setItem('docgen_autosave', JSON.stringify(data));
    }, 1000);
});

// Carregar dados salvos automaticamente
window.addEventListener('load', function() {
    const savedData = localStorage.getItem('docgen_autosave');
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            Object.keys(data).forEach(key => {
                const field = form.querySelector(`[name="${key}"]`);
                if (field) {
                    field.value = data[key];
                }
            });
        } catch (e) {
            console.log('Erro ao carregar dados salvos');
        }
    }
});
