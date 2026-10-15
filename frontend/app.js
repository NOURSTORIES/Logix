const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

$('#year').textContent = new Date().getFullYear();

$('#menuToggle').addEventListener('click', () => {
  $('#navLinks').classList.toggle('open');
});
$$('#navLinks a').forEach(link => link.addEventListener('click', () => $('#navLinks').classList.remove('open')));

$('#themeToggle').addEventListener('click', () => {
  document.body.classList.toggle('light');
  $('#themeToggle').textContent = document.body.classList.contains('light') ? '☾' : '☼';
});

let language = 'ar';
$('#languageToggle').addEventListener('click', () => {
  language = language === 'ar' ? 'en' : 'ar';
  document.documentElement.lang = language;
  document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  document.body.dir = language === 'ar' ? 'rtl' : 'ltr';
  $('#languageToggle').textContent = language === 'ar' ? 'EN' : 'عربي';
  $$('[data-ar][data-en]').forEach(el => { el.innerHTML = el.dataset[language]; });
  const name = $('[name="name"]');
  if (name) name.placeholder = language === 'ar' ? 'نور إبراهيم' : 'Your name';
  const phone = $('[name="phone"]');
  if (phone) phone.placeholder = language === 'ar' ? '+20 1X XXX XXXX' : '+1 555 000 0000';
  const message = $('[name="message"]');
  if (message) message.placeholder = language === 'ar'
    ? 'ما المشكلة التي تريد حلها؟ ما أهم الوظائف المطلوبة؟'
    : 'What problem are you solving? What features do you need?';
  const service = $('[name="service"] option');
  if (service) service.textContent = language === 'ar' ? 'اختر الخدمة' : 'Choose a service';
});

$('#contactForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const button = form.querySelector('button[type="submit"]');
  const message = $('#formMessage');
  const payload = Object.fromEntries(new FormData(form).entries());
  message.classList.remove('error');
  button.disabled = true;
  button.style.opacity = '.7';
  message.textContent = language === 'ar' ? 'جارٍ إرسال الطلب…' : 'Sending your request…';
  try {
    const response = await fetch('/api/requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Request failed');
    message.textContent = language === 'ar'
      ? `تم إرسال طلبك بنجاح. رقم الطلب: ${result.request.id}`
      : `Request submitted. Reference: ${result.request.id}`;
    form.reset();
  } catch (error) {
    message.classList.add('error');
    message.textContent = language === 'ar'
      ? 'لم يتم حفظ الطلب. تأكد أن الخادم وقاعدة البيانات يعملان، ثم حاول مجدداً.'
      : 'Could not save the request. Make sure the server and database are running, then try again.';
  } finally {
    button.disabled = false;
    button.style.opacity = '1';
  }
});
