// Dashboard Interactive Features

// ============= Metric Card Interactions =============
const metricCards = document.querySelectorAll('.metric-card');

metricCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-4px)';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
  });

  card.addEventListener('click', () => {
    const metric = card.dataset.metric;
    showNotification(`Viewing ${metric} details`);
  });
});

// ============= Revenue Chart Generation =============
function generateRevenueChart(days = 30) {
  const chart = document.getElementById('revenue-chart');
  chart.innerHTML = '';

  const bars = [];
  let maxValue = 0;

  // Generate random data
  for (let i = 0; i < days; i++) {
    const value = Math.floor(Math.random() * 8000) + 2000;
    bars.push(value);
    if (value > maxValue) maxValue = value;
  }

  // Create bars
  bars.forEach((value, index) => {
    const bar = document.createElement('div');
    bar.className = 'bar';
    const height = (value / maxValue) * 100;
    bar.style.height = height + '%';
    bar.title = `Day ${index + 1}: $${value.toLocaleString()}`;
    
    bar.addEventListener('mouseenter', () => {
      bar.style.opacity = '0.8';
    });

    bar.addEventListener('mouseleave', () => {
      bar.style.opacity = '1';
    });

    chart.appendChild(bar);
  });
}

// Initialize chart
generateRevenueChart(30);

// Chart time range selector
const revenueSelect = document.getElementById('revenue-select');
revenueSelect.addEventListener('change', (e) => {
  generateRevenueChart(parseInt(e.target.value));
});

// ============= Activity Items Interactions =============
const activityItems = document.querySelectorAll('.activity-item');

activityItems.forEach(item => {
  item.addEventListener('click', () => {
    item.style.backgroundColor = 'rgba(16, 185, 129, 0.05)';
    setTimeout(() => {
      item.style.backgroundColor = '';
    }, 500);
  });
});

// ============= Task Management =============
const addTaskBtn = document.getElementById('add-task-btn');
const taskInputContainer = document.getElementById('task-input-container');
const submitTaskBtn = document.getElementById('submit-task-btn');
const cancelTaskBtn = document.getElementById('cancel-task-btn');
const taskInput = document.getElementById('task-input');
const tasksList = document.querySelector('.tasks-list');

// Show task input
addTaskBtn.addEventListener('click', () => {
  taskInputContainer.style.display = 'flex';
  taskInput.focus();
});

// Hide task input
cancelTaskBtn.addEventListener('click', () => {
  taskInputContainer.style.display = 'none';
  taskInput.value = '';
});

// Add new task
submitTaskBtn.addEventListener('click', addNewTask);
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addNewTask();
  }
});

function addNewTask() {
  const text = taskInput.value.trim();
  if (text === '') return;

  const taskItem = document.createElement('div');
  taskItem.className = 'task-item';
  
  const id = 'task-' + Date.now();
  
  taskItem.innerHTML = `
    <input type="checkbox" id="${id}" class="task-checkbox">
    <label for="${id}" class="task-label">${text}</label>
  `;

  // Add animation
  taskItem.style.opacity = '0';
  taskItem.style.transform = 'translateY(-10px)';
  
  tasksList.appendChild(taskItem);
  
  setTimeout(() => {
    taskItem.style.opacity = '1';
    taskItem.style.transform = 'translateY(0)';
    taskItem.style.transition = 'all 0.3s ease-out';
  }, 10);

  // Add remove functionality
  const checkbox = taskItem.querySelector('.task-checkbox');
  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      setTimeout(() => {
        taskItem.style.opacity = '0';
        taskItem.style.transform = 'translateX(-20px)';
        setTimeout(() => taskItem.remove(), 300);
      }, 500);
    }
  });

  taskInput.value = '';
  taskInputContainer.style.display = 'none';
}

// Mark existing tasks as done
const existingCheckboxes = document.querySelectorAll('.task-checkbox');
existingCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('change', function() {
    const taskItem = this.parentElement;
    if (this.checked) {
      setTimeout(() => {
        taskItem.style.opacity = '0';
        taskItem.style.transform = 'translateX(-20px)';
        setTimeout(() => taskItem.remove(), 300);
      }, 500);
    }
  });
});

// ============= Funnel Chart Interactions =============
const funnelBars = document.querySelectorAll('.funnel-bar');

funnelBars.forEach(bar => {
  bar.addEventListener('mouseenter', () => {
    bar.style.transform = 'translateX(8px)';
  });

  bar.addEventListener('mouseleave', () => {
    bar.style.transform = 'translateX(0)';
  });

  bar.addEventListener('click', () => {
    const value = bar.querySelector('.funnel-value').textContent;
    showNotification(`${value} in this stage`);
  });
});

// ============= Theme Toggle =============
const themeBtn = document.getElementById('theme-btn');
let isDarkMode = false;

themeBtn.addEventListener('click', () => {
  isDarkMode = !isDarkMode;
  
  if (isDarkMode) {
    document.documentElement.style.setProperty('--primary-bg', '#1a1a1a');
    document.documentElement.style.setProperty('--primary-border', '#2d2d2d');
    document.documentElement.style.setProperty('--primary-text', '#ffffff');
    document.documentElement.style.setProperty('--secondary-text', '#a0a0a0');
    document.documentElement.style.setProperty('--card-bg', '#222222');
    document.documentElement.style.setProperty('--card-hover', '#2d2d2d');
    document.body.style.backgroundColor = '#0f0f0f';
    document.documentElement.style.backgroundColor = '#0f0f0f';
    themeBtn.textContent = '☀️';
  } else {
    document.documentElement.style.setProperty('--primary-bg', '#ffffff');
    document.documentElement.style.setProperty('--primary-border', '#f0f0f0');
    document.documentElement.style.setProperty('--primary-text', '#1a1a1a');
    document.documentElement.style.setProperty('--secondary-text', '#6b7280');
    document.documentElement.style.setProperty('--card-bg', '#ffffff');
    document.documentElement.style.setProperty('--card-hover', '#fafafa');
    document.body.style.backgroundColor = '#f9fafb';
    document.documentElement.style.backgroundColor = '#f9fafb';
    themeBtn.textContent = '🌙';
  }
});

// ============= Notifications =============
const notifBtn = document.getElementById('notif-btn');
let notificationCount = 3;

notifBtn.addEventListener('click', () => {
  showNotification(`You have ${notificationCount} notifications`);
  notificationCount = Math.max(0, notificationCount - 1);
  updateNotifBadge();
});

function updateNotifBadge() {
  if (notificationCount > 0) {
    notifBtn.style.position = 'relative';
    let badge = notifBtn.querySelector('.notif-badge');
    if (!badge) {
      badge = document.createElement('span');
      badge.className = 'notif-badge';
      badge.style.position = 'absolute';
      badge.style.top = '-5px';
      badge.style.right = '-5px';
      badge.style.width = '20px';
      badge.style.height = '20px';
      badge.style.borderRadius = '50%';
      badge.style.backgroundColor = '#ef4444';
      badge.style.color = 'white';
      badge.style.display = 'flex';
      badge.style.alignItems = 'center';
      badge.style.justifyContent = 'center';
      badge.style.fontSize = '0.75rem';
      badge.style.fontWeight = '700';
      notifBtn.appendChild(badge);
    }
    badge.textContent = notificationCount;
  }
}

updateNotifBadge();

// ============= Notification Toast =============
function showNotification(message) {
  const toast = document.createElement('div');
  toast.style.position = 'fixed';
  toast.style.bottom = '2rem';
  toast.style.right = '2rem';
  toast.style.backgroundColor = '#10b981';
  toast.style.color = 'white';
  toast.style.padding = '1rem 1.5rem';
  toast.style.borderRadius = '0.5rem';
  toast.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)';
  toast.style.zIndex = '9999';
  toast.style.animation = 'slideIn 0.3s ease-out';
  toast.style.fontSize = '0.95rem';
  toast.style.fontWeight = '500';
  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'fadeOut 0.3s ease-out forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Add fadeOut animation
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeOut {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(1rem);
    }
  }
`;
document.head.appendChild(style);

// ============= Metric Values Animation =============
function animateValue(element, start, end, duration) {
  let current = start;
  const increment = (end - start) / (duration / 16);
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= end) {
      current = end;
      clearInterval(timer);
    }
    element.textContent = current.toFixed(0);
  }, 16);
}

// ============= Smooth Scrolling =============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ============= Loading Animation on Page Load =============
window.addEventListener('load', () => {
  const cards = document.querySelectorAll('.metric-card, .chart-card, .activity-card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    setTimeout(() => {
      card.style.transition = 'all 0.4s ease-out';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 50);
  });
});

// ============= Keyboard Shortcuts =============
document.addEventListener('keydown', (e) => {
  // Alt + A to add task
  if (e.altKey && e.key === 'a') {
    e.preventDefault();
    addTaskBtn.click();
  }
  
  // Alt + T to toggle theme
  if (e.altKey && e.key === 't') {
    e.preventDefault();
    themeBtn.click();
  }
});

// ============= Avatar Interaction =============
const avatar = document.querySelector('.avatar');
if (avatar) {
  avatar.addEventListener('click', () => {
    showNotification('User Profile (Feature coming soon)');
  });
}

// ============= Window Resize Handler =============
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    generateRevenueChart(parseInt(revenueSelect.value));
  }, 250);
});

console.log('Dashboard initialized! Try: Alt+A to add task, Alt+T to toggle theme');
