const API = '/api/items';

async function loadItems() {
  const res = await fetch(API);
  const items = await res.json();
  const list = $('#items-list').empty();

  items.forEach(item => {
    const li = $(`
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <strong>${item.name}</strong><br/>
          <small>${item.description || ''}</small>
        </div>
        <div>
          <button class="btn btn-sm btn-warning me-2 edit" data-id="${item._id}">Edit</button>
          <button class="btn btn-sm btn-danger delete" data-id="${item._id}">Delete</button>
        </div>
      </li>
    `);
    list.append(li);
  });
}

$(document).on('submit', '#create-form', async function (e) {
  e.preventDefault();
  const name = $('#name').val().trim();
  const description = $('#description').val().trim();
  if (!name) return;

  await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, description })
  });

  $('#name').val('');
  $('#description').val('');
  loadItems();
});

$(document).on('click', '.delete', async function () {
  const id = $(this).data('id');
  await fetch(`${API}/${id}`, { method: 'DELETE' });
  loadItems();
});

$(document).on('click', '.edit', async function () {
  const id = $(this).data('id');
  const res = await fetch(`${API}/${id}`);
  const item = await res.json();

  const name = prompt('New name:', item.name);
  const desc = prompt('New description:', item.description);
  if (!name) return;

  await fetch(`${API}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, description: desc })
  });

  loadItems();
});

$(document).ready(loadItems);
