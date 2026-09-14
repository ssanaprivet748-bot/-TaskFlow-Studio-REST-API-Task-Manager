const API_URL = "http://127.0.0.1:8000/tasks";

const priorityBadges = {
    low: '<span class="px-2 py-0.5 text-xs rounded-full bg-slate-500/10 text-slate-400 border border-slate-500/20">Низкий</span>',
    medium: '<span class="px-2 py-0.5 text-xs rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">Средний</span>',
    high: '<span class="px-2 py-0.5 text-xs rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">Высокий</span>'
};

// 1. GET: Загрузка всех задач
async function fetchTasks() {
    const badge = document.getElementById('status-badge');
    const container = document.getElementById('tasks-container');

    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error();
        const tasks = await res.json();

        badge.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-500"></span><span>API Подключено</span>`;

        document.getElementById('stat-total').innerText = tasks.length;
        document.getElementById('stat-completed').innerText = tasks.filter(t => t.is_completed).length;
        document.getElementById('stat-pending').innerText = tasks.filter(t => !t.is_completed).length;

        if (tasks.length === 0) {
            container.innerHTML = `<div class="text-slate-500 text-center py-12">Список пуст</div>`;
            return;
        }

        container.innerHTML = tasks.map(task => `
            <div class="group glass border border-dark-border rounded-xl p-4 flex items-start justify-between gap-4 ${task.is_completed ? 'opacity-60 bg-dark-bg/40' : 'bg-dark-card/50'}">
                <div class="flex items-start gap-3.5 flex-1 min-w-0">
                    <button onclick="toggleTask('${task.id}', ${!task.is_completed})" class="mt-1 w-5 h-5 rounded border ${task.is_completed ? 'bg-brand-600 border-brand-600' : 'border-dark-border'} flex items-center justify-center transition-colors">
                        ${task.is_completed ? '<svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>' : ''}
                    </button>
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center gap-2 mb-1">
                            <h3 class="text-sm font-semibold text-white truncate ${task.is_completed ? 'line-through text-slate-400' : ''}">${task.title}</h3>
                            ${priorityBadges[task.priority] || ''}
                        </div>
                        ${task.description ? `<p class="text-xs text-slate-400 line-clamp-2">${task.description}</p>` : ''}
                    </div>
                </div>
                <button onclick="deleteTask('${task.id}')" class="opacity-0 group-hover:opacity-100 p-1.5 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition-all">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                </button>
            </div>
        `).join('');

    } catch (err) {
        badge.innerHTML = `<span class="w-2 h-2 rounded-full bg-rose-500"></span><span>Ошибка сервера</span>`;
        container.innerHTML = `<div class="text-rose-400 text-center py-12">Сервер недоступен. Запусти uvicorn!</div>`;
    }
}

// 2. POST: Создание задачи
document.getElementById('create-task-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const payload = {
        title: document.getElementById('task-title').value,
        description: document.getElementById('task-desc').value || null,
        priority: document.getElementById('task-priority').value
    };

    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    e.target.reset();
    fetchTasks();
});

// 3. PATCH: Обновление статуса
async function toggleTask(id, is_completed) {
    await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_completed })
    });
    fetchTasks();
}

// 4. DELETE: Удаление
async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchTasks();
}

fetchTasks();