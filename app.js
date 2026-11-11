/*
 * UnISCED redesign - JavaScript
 * Funcionalidades: menu móvel, catálogo pesquisável, filtros, ordenação,
 * plano de cursos guardado em localStorage e formulário demonstrativo.
 */

const COURSES = [
  // Faculdade de Ciências de Saúde
  { id: 'nutricao', name: 'Nutrição', level: 'Licenciatura', faculty: 'Ciências de Saúde' },
  { id: 'saude-publica', name: 'Saúde Pública', level: 'Mestrado', faculty: 'Ciências de Saúde' },

  // Faculdade de Ciências de Educação
  { id: 'doutoramento-ead', name: 'Educação a Distância e e-Learning', level: 'Doutoramento', faculty: 'Ciências de Educação' },
  { id: 'ensino-biologia', name: 'Ensino de Biologia', level: 'Licenciatura', faculty: 'Ciências de Educação' },
  { id: 'ensino-geografia', name: 'Ensino de Geografia', level: 'Licenciatura', faculty: 'Ciências de Educação' },
  { id: 'ensino-historia', name: 'Ensino de História', level: 'Licenciatura', faculty: 'Ciências de Educação' },
  { id: 'ensino-matematica', name: 'Ensino de Matemática', level: 'Licenciatura', faculty: 'Ciências de Educação' },
  { id: 'ensino-portugues', name: 'Ensino de Português', level: 'Licenciatura', faculty: 'Ciências de Educação' },
  { id: 'mestrado-ensino-biologia', name: 'Ensino de Biologia', level: 'Mestrado', faculty: 'Ciências de Educação' },
  { id: 'mestrado-ensino-geografia', name: 'Ensino de Geografia', level: 'Mestrado', faculty: 'Ciências de Educação' },
  { id: 'mestrado-ensino-matematica', name: 'Ensino de Matemática', level: 'Mestrado', faculty: 'Ciências de Educação' },
  { id: 'mestrado-ensino-portugues', name: 'Ensino de Português', level: 'Mestrado', faculty: 'Ciências de Educação' },
  { id: 'tecnologias-educativas', name: 'Tecnologias Educativas e e-Learning', level: 'Mestrado', faculty: 'Ciências de Educação' },

  // Faculdade de Economia e Gestão
  { id: 'contabilidade-auditoria', name: 'Contabilidade e Auditoria', level: 'Licenciatura', faculty: 'Economia e Gestão' },
  { id: 'gestao-ambiental', name: 'Gestão Ambiental', level: 'Licenciatura', faculty: 'Economia e Gestão' },
  { id: 'gestao-empresas', name: 'Gestão de Empresas', level: 'Licenciatura', faculty: 'Economia e Gestão' },
  { id: 'gestao-recursos-humanos', name: 'Gestão de Recursos Humanos', level: 'Licenciatura', faculty: 'Economia e Gestão' },
  { id: 'gestao-sistemas-informacao', name: 'Gestão de Sistemas de Informação', level: 'Licenciatura', faculty: 'Economia e Gestão' },
  { id: 'gestao-turismo', name: 'Gestão de Turismo', level: 'Licenciatura', faculty: 'Economia e Gestão' },
  { id: 'administracao-gestao-negocios', name: 'Administração e Gestão de Negócios', level: 'Mestrado', faculty: 'Economia e Gestão' },
  { id: 'mestrado-contabilidade-auditoria', name: 'Contabilidade e Auditoria', level: 'Mestrado', faculty: 'Economia e Gestão' },
  { id: 'gestao-ambiental-sustentabilidade', name: 'Gestão Ambiental e Sustentabilidade', level: 'Mestrado', faculty: 'Economia e Gestão' },
  { id: 'mestrado-gestao-recursos-humanos', name: 'Gestão de Recursos Humanos', level: 'Mestrado', faculty: 'Economia e Gestão' },

  // Faculdade de Ciências Sociais e Humanas
  { id: 'administracao-publica', name: 'Administração Pública', level: 'Licenciatura', faculty: 'Ciências Sociais e Humanas' },
  { id: 'ciencia-politica-relacoes-internacionais', name: 'Ciência Política e Relações Internacionais', level: 'Licenciatura', faculty: 'Ciências Sociais e Humanas' },
  { id: 'comunicacao-jornalismo-marketing', name: 'Comunicação Aplicada ao Jornalismo e Marketing', level: 'Licenciatura', faculty: 'Ciências Sociais e Humanas' },
  { id: 'mestrado-administracao-publica', name: 'Administração Pública', level: 'Mestrado', faculty: 'Ciências Sociais e Humanas' },
  { id: 'ciencia-politica-governacao', name: 'Ciência Política e Governação', level: 'Mestrado', faculty: 'Ciências Sociais e Humanas' },

  // Faculdade de Direito
  { id: 'direito', name: 'Direito', level: 'Licenciatura', faculty: 'Direito' },
  { id: 'direito-civil', name: 'Direito Civil', level: 'Mestrado', faculty: 'Direito' },
  { id: 'direito-fiscal-aduaneiro', name: 'Direito Fiscal e Aduaneiro', level: 'Mestrado', faculty: 'Direito' },
  { id: 'direito-penal', name: 'Direito Penal', level: 'Mestrado', faculty: 'Direito' },

  // Faculdade de Engenharias e Agricultura
  { id: 'agronegocios', name: 'Agronegócios', level: 'Licenciatura', faculty: 'Engenharias e Agricultura' },
  { id: 'desenvolvimento-agrario', name: 'Desenvolvimento Agrário', level: 'Licenciatura', faculty: 'Engenharias e Agricultura' },
  { id: 'engenharia-informatica', name: 'Engenharia Informática', level: 'Licenciatura', faculty: 'Engenharias e Agricultura' },

  // Cursos de curta duração
  { id: 'exploracao-florestal-madeira', name: 'Exploração Florestal e Processamento de Madeira', level: 'Curso de curta duração', faculty: 'Cursos de curta duração' },
  { id: 'formacao-psicopedagogica', name: 'Formação Psicopedagógica de Curta Duração', level: 'Curso de curta duração', faculty: 'Cursos de curta duração' },
  { id: 'avicultura', name: 'Curso Híbrido Profissionalizante de Avicultura', level: 'Curso de curta duração', faculty: 'Cursos de curta duração' },
  { id: 'pc-hardware-software', name: 'PC Hardware & Software e Microsoft Office & Google Apps', level: 'Curso de curta duração', faculty: 'Cursos de curta duração' }
];

const STORAGE_KEYS = {
  plan: 'unisced-redesign-study-plan',
  registrations: 'unisced-redesign-demo-registrations'
};

const normalise = (value) => String(value ?? '')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLocaleLowerCase('pt-PT')
  .trim();

function readStoredArray(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || '[]');
    return Array.isArray(value) ? value : [];
  } catch (error) {
    console.warn(`Não foi possível ler ${key}.`, error);
    return [];
  }
}

function writeStoredArray(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn(`Não foi possível guardar ${key}.`, error);
    return false;
  }
}

// Menu móvel acessível por teclado e por toque.
function setupMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    toggle.setAttribute('aria-label', expanded ? 'Abrir menu' : 'Fechar menu');
    nav.classList.toggle('is-open', !expanded);
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menu');
      nav.classList.remove('is-open');
    });
  });
}

function setupYear() {
  document.querySelectorAll('[data-year]').forEach((node) => {
    node.textContent = new Date().getFullYear();
  });
}

/*
 * Índice invertido por prefixo: cada prefixo de cada palavra aponta para
 * os cursos correspondentes. A pesquisa intersecta os conjuntos dos termos,
 * evitando percorrer e comparar todo o texto de cada cartão a cada tecla.
 */
function buildCourseSearchIndex(courses) {
  const index = new Map();
  courses.forEach((course, courseIndex) => {
    const searchable = normalise(`${course.name} ${course.level} ${course.faculty}`);
    const words = searchable.split(/[^a-z0-9]+/).filter(Boolean);
    const prefixes = new Set();
    words.forEach((word) => {
      for (let length = 1; length <= word.length; length += 1) {
        prefixes.add(word.slice(0, length));
      }
    });
    prefixes.forEach((prefix) => {
      if (!index.has(prefix)) index.set(prefix, new Set());
      index.get(prefix).add(courseIndex);
    });
  });
  return index;
}

const COURSE_SEARCH_INDEX = buildCourseSearchIndex(COURSES);

function findCoursesByText(query) {
  const terms = normalise(query).split(/\s+/).filter(Boolean);
  if (!terms.length) return COURSES;

  const matchingSets = terms.map((term) => COURSE_SEARCH_INDEX.get(term) || new Set());
  matchingSets.sort((a, b) => a.size - b.size);
  if (matchingSets[0].size === 0) return [];

  const matches = [];
  matchingSets[0].forEach((courseIndex) => {
    if (matchingSets.every((set) => set.has(courseIndex))) matches.push(COURSES[courseIndex]);
  });
  return matches;
}

function populateFacultyFilter() {
  const select = document.getElementById('faculty-filter');
  if (!select) return;
  const faculties = [...new Set(COURSES.map((course) => course.faculty))]
    .sort((a, b) => a.localeCompare(b, 'pt'));

  faculties.forEach((faculty) => {
    const option = document.createElement('option');
    option.value = faculty;
    option.textContent = faculty;
    select.append(option);
  });

  const requestedFaculty = new URLSearchParams(window.location.search).get('faculdade');
  if (requestedFaculty && faculties.includes(requestedFaculty)) select.value = requestedFaculty;
}

function getPlanIds() {
  return readStoredArray(STORAGE_KEYS.plan).filter((id) => COURSES.some((course) => course.id === id));
}

function savePlanIds(ids) {
  writeStoredArray(STORAGE_KEYS.plan, [...new Set(ids)]);
}

function renderSavedCourses() {
  const container = document.getElementById('saved-courses');
  const count = document.getElementById('plan-count');
  if (!container || !count) return;

  const ids = getPlanIds();
  const chosen = ids.map((id) => COURSES.find((course) => course.id === id)).filter(Boolean);
  count.textContent = String(chosen.length);
  container.replaceChildren();

  if (chosen.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'empty-plan';
    empty.textContent = 'Ainda não adicionou cursos. Use o botão “Adicionar ao plano” num curso para começar.';
    container.append(empty);
    return;
  }

  chosen.forEach((course) => {
    const item = document.createElement('div');
    item.className = 'saved-course';
    const details = document.createElement('div');
    const name = document.createElement('strong');
    name.textContent = course.name;
    const meta = document.createElement('small');
    meta.textContent = course.level;
    details.append(name, meta);

    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'remove-course';
    remove.setAttribute('aria-label', `Remover ${course.name} do meu plano`);
    remove.textContent = '×';
    remove.addEventListener('click', () => {
      savePlanIds(getPlanIds().filter((id) => id !== course.id));
      renderSavedCourses();
      renderCourseCards();
    });
    item.append(details, remove);
    container.append(item);
  });
}

function createCourseCard(course) {
  const saved = getPlanIds().includes(course.id);
  const article = document.createElement('article');
  article.className = 'course-card';

  const top = document.createElement('div');
  top.className = 'course-card-top';
  const level = document.createElement('span');
  level.className = 'course-level';
  level.textContent = course.level;
  const faculty = document.createElement('span');
  faculty.className = 'course-faculty';
  faculty.textContent = course.faculty;
  top.append(level, faculty);

  const title = document.createElement('h3');
  title.textContent = course.name;
  const bottom = document.createElement('div');
  bottom.className = 'course-card-bottom';

  const details = document.createElement('span');
  details.className = 'course-duration';
  details.textContent = course.level === 'Curso de curta duração' ? 'Formação de curta duração' : 'Consulte o plano curricular';

  const actions = document.createElement('div');
  actions.className = 'course-actions';
  const planButton = document.createElement('button');
  planButton.type = 'button';
  planButton.className = saved ? 'course-add is-added' : 'course-add';
  planButton.textContent = saved ? 'Adicionado ✓' : '＋ Adicionar ao plano';
  planButton.setAttribute('aria-pressed', String(saved));
  planButton.addEventListener('click', () => {
    const current = getPlanIds();
    const next = current.includes(course.id)
      ? current.filter((id) => id !== course.id)
      : [...current, course.id];
    savePlanIds(next);
    renderCourseCards();
    renderSavedCourses();
  });

  const enrollLink = document.createElement('a');
  enrollLink.className = 'course-enroll';
  enrollLink.href = `inscricao.html?curso=${encodeURIComponent(course.name)}&nivel=${encodeURIComponent(course.level)}`;
  enrollLink.textContent = 'Inscrever-se →';
  actions.append(planButton, enrollLink);
  bottom.append(details, actions);
  article.append(top, title, bottom);
  return article;
}

function renderCourseCards() {
  const grid = document.getElementById('course-grid');
  const count = document.getElementById('result-count');
  if (!grid || !count) return;

  const search = document.getElementById('course-search')?.value || '';
  const level = document.getElementById('level-filter')?.value || 'all';
  const faculty = document.getElementById('faculty-filter')?.value || 'all';
  const sort = document.getElementById('sort-courses')?.value || 'az';

  let results = findCoursesByText(search).filter((course) => {
    const matchesLevel = level === 'all' || course.level === level;
    const matchesFaculty = faculty === 'all' || course.faculty === faculty;
    return matchesLevel && matchesFaculty;
  });

  const collator = new Intl.Collator('pt', { sensitivity: 'base' });
  const levelOrder = { 'Licenciatura': 1, 'Mestrado': 2, 'Doutoramento': 3, 'Curso de curta duração': 4 };
  results = [...results].sort((a, b) => {
    if (sort === 'za') return collator.compare(b.name, a.name);
    if (sort === 'level') return (levelOrder[a.level] - levelOrder[b.level]) || collator.compare(a.name, b.name);
    if (sort === 'faculty') return collator.compare(a.faculty, b.faculty) || collator.compare(a.name, b.name);
    return collator.compare(a.name, b.name);
  });

  count.textContent = `${results.length} ${results.length === 1 ? 'curso encontrado' : 'cursos encontrados'}`;
  grid.replaceChildren();

  if (!results.length) {
    const empty = document.createElement('div');
    empty.className = 'no-results';
    empty.innerHTML = '<span aria-hidden="true">⌕</span><h3>Nenhum curso encontrado</h3><p>Experimente alterar os termos de pesquisa ou limpar os filtros.</p>';
    grid.append(empty);
    return;
  }

  results.forEach((course) => grid.append(createCourseCard(course)));
}

function setupCourseCatalog() {
  const grid = document.getElementById('course-grid');
  if (!grid) return;

  populateFacultyFilter();
  ['course-search', 'level-filter', 'faculty-filter', 'sort-courses'].forEach((id) => {
    const control = document.getElementById(id);
    control?.addEventListener('input', renderCourseCards);
    control?.addEventListener('change', renderCourseCards);
  });

  document.getElementById('clear-filters')?.addEventListener('click', () => {
    document.getElementById('course-search').value = '';
    document.getElementById('level-filter').value = 'all';
    document.getElementById('faculty-filter').value = 'all';
    document.getElementById('sort-courses').value = 'az';
    renderCourseCards();
  });

  // Atalho de teclado para colocar o cursor na pesquisa.
  document.addEventListener('keydown', (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      document.getElementById('course-search')?.focus();
    }
  });

  renderCourseCards();
  renderSavedCourses();
}

function setupRegistrationForm() {
  const form = document.getElementById('registration-form');
  if (!form) return;

  const levelSelect = document.getElementById('registration-level');
  const courseSelect = document.getElementById('registration-course');
  const message = document.getElementById('form-message');

  function updateCourseOptions(preselectedName = '') {
    const level = levelSelect.value;
    const matching = COURSES.filter((course) => !level || course.level === level)
      .sort((a, b) => a.name.localeCompare(b.name, 'pt'));
    courseSelect.replaceChildren();
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = level ? 'Seleccione o curso pretendido' : 'Seleccione primeiro o nível académico';
    courseSelect.append(placeholder);
    matching.forEach((course) => {
      const option = document.createElement('option');
      option.value = course.name;
      option.textContent = `${course.name} — ${course.faculty}`;
      courseSelect.append(option);
    });
    if (preselectedName && matching.some((course) => course.name === preselectedName)) {
      courseSelect.value = preselectedName;
    }
  }

  levelSelect.addEventListener('change', () => updateCourseOptions());

  const params = new URLSearchParams(window.location.search);
  const requestedLevel = params.get('nivel');
  const requestedCourse = params.get('curso');
  if (requestedLevel && [...levelSelect.options].some((option) => option.value === requestedLevel)) {
    levelSelect.value = requestedLevel;
  }
  updateCourseOptions(requestedCourse || '');

  form.addEventListener('reset', () => {
    window.setTimeout(() => {
      updateCourseOptions();
      message.textContent = '';
      message.className = 'form-message';
    }, 0);
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    message.textContent = '';
    message.className = 'form-message';

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);
    const entry = {
      id: `demo-${Date.now()}`,
      fullName: String(formData.get('fullName')).trim(),
      email: String(formData.get('email')).trim(),
      phone: String(formData.get('phone')).trim(),
      province: String(formData.get('province')),
      level: String(formData.get('level')),
      course: String(formData.get('course')),
      source: String(formData.get('source') || ''),
      createdAt: new Date().toISOString()
    };

    const previous = readStoredArray(STORAGE_KEYS.registrations);
    const saved = writeStoredArray(STORAGE_KEYS.registrations, [...previous, entry].slice(-50));
    if (saved) {
      message.textContent = 'Pré-inscrição demonstrativa guardada neste navegador. Esta informação não foi enviada à UnISCED. Para uma candidatura real, utilize o portal oficial.';
      message.classList.add('is-success');
      form.reset();
    } else {
      message.textContent = 'Não foi possível guardar os dados neste navegador. Verifique as definições de armazenamento e tente novamente.';
      message.classList.add('is-error');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupMobileMenu();
  setupYear();
  setupCourseCatalog();
  setupRegistrationForm();
});
