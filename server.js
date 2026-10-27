const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Проверка работы API
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to ClientFlow Open Source API',
    status: 'online',
    timestamp: new Date()
  });
});

// Получить список всех клиентов
app.get('/api/clients', (req, res) => {
  res.json([
    { id: '1', name: 'Иван Иванов', company: 'TechCorp', status: 'ONBOARDING', progress: 65 },
    { id: '2', name: 'Елена Смирнова', company: 'DesignStudio', status: 'PENDING', progress: 10 },
    { id: '3', name: 'Алексей Петров', company: 'FinTech LLC', status: 'COMPLETED', progress: 100 }
  ]);
});

// Получить задачи конкретного клиента по его токену (для Портала Клиента)
app.get('/api/portal/:token', (req, res) => {
  res.json({
    clientCompany: 'TechCorp',
    contactName: 'Иван Иванов',
    tasks: [
      { id: 't1', title: 'Заполнить анкетирование и бриф', completed: true },
      { id: 't2', title: 'Предоставить доступы к рекламному кабинету', completed: true },
      { id: 't3', title: 'Утвердить техническое задание', completed: false },
      { id: 't4', title: 'Загрузить логотипы и брендинг', completed: false }
    ]
  });
});

// Создать нового клиента
app.post('/api/clients', (req, res) => {
  const { name, company, email } = req.body;
  res.status(201).json({
    message: 'Client created successfully',
    client: { id: Date.now().toString(), name, company, email, status: 'PENDING', progress: 0 }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 ClientFlow API запущен на порту ${PORT}`);
});
