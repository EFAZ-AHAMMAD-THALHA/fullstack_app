const toggleEditMode = (id) => {
    const viewMode = document.getElementById(`view-${id}`);
    const editMode = document.getElementById(`edit-${id}`);
    viewMode.classList.toggle('hidden');
    editMode.classList.toggle('hidden');
  };
  
  const showNotification = () => {
    const notification = document.getElementById('notification');
    notification.classList.remove('hidden');
    notification.classList.add('active');
    setTimeout(() => {
      notification.classList.remove('active');
      notification.classList.add('hidden');
    }, 3000);
  };
  
  const createMessage = () => {
    const nameInput = document.getElementById('nameInput');
    const contentInput = document.getElementById('contentInput');
  
    const message = {
      name: nameInput.value,
      content: contentInput.value,
    };
    postMessage(message);
    nameInput.value = '';
    contentInput.value = '';
  };
  
  const postMessage = async (message) => {
    try {
      const response = await fetch('http://localhost:3000/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });
      if (response.ok) {
        showNotification();
      } else {
        throw new Error('Failed to post message');
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      fetchMessages();
    }
  };
  
  const fetchMessages = async () => {
    try {
      const response = await fetch('http://localhost:3000/messages');
      const data = await response.json();
      displayMessages(data);
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };
  
  const displayMessages = (messages) => {
    const messageContainer = document.getElementById('messageContainer');
    messageContainer.innerHTML = '<h2>Messages</h2>';
  
    messages.forEach((message) => {
      const messageElement = document.createElement('div');
      messageElement.classList.add('message');
      const { id, name, content } = message;
  
      messageElement.innerHTML = `
        <div id="view-${id}">
          <h3>${name}</h3>
          <p>${content}</p>
          <button onclick="toggleEditMode(${id})">Edit</button>
          <button onclick="deleteMessage(${id})">Delete</button>
        </div>
        <div id="edit-${id}" class="hidden">
          <input id="editName-${id}" type="text" value="${name}" />
          <textarea id="editContent-${id}">${content}</textarea>
          <button onclick="updateMessage(${id})">Save</button>
          <button onclick="toggleEditMode(${id})">Cancel</button>
        </div>
      `;
  
      messageContainer.appendChild(messageElement);
    });
  };
  
  const updateMessage = async (id) => {
    const name = document.getElementById(`editName-${id}`).value;
    const content = document.getElementById(`editContent-${id}`).value;
    const data = { id, name, content };
    
    try {
      const response = await fetch('http://localhost:3000/messages', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        showNotification();
      } else {
        throw new Error('Failed to update message');
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      fetchMessages();
    }
  };
  
  const deleteMessage = async (id) => {
    try {
      const response = await fetch('http://localhost:3000/messages', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        showNotification();
      } else {
        throw new Error('Failed to delete message');
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      fetchMessages();
    }
  };
  
  fetchMessages();