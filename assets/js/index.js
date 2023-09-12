function renderUsers() {
	usersCount.innerHTML += " Chargement...";

	fetch(
		`http://localhost/annuaire_user/src/controllers/users.php?search=${usersSearchInput.value}`,
	)
		.then((response) => response.json())
		.then((users) => {
			usersTableBody.innerHTML = "";

			users.forEach((user, index) => {
				let row = usersTableBody.insertRow(index);
				row.setAttribute("data-user-id", user.id);
				row.onclick = () => {
					showUser(user.id);
				};

				let avatarCell = row.insertCell(0);
				let nameCell = row.insertCell(1);

				avatarCell.innerHTML = `<img src="https://ui-avatars.com/api/?name=${user.firstname}+${user.lastname}" alt="${user.firstname} ${user.lastname}" class="avatar">`;
				nameCell.innerHTML = user.firstname + " " + user.lastname;
			});

			usersCount.innerHTML =
				users.length + " résultats correspondant à cette recherche.";
		});
}

function showUser(id) {
	editUserModal.style.display = "flex";

	fetch(`http://localhost/annuaire_user/src/controllers/user.php?id=${id}`)
		.then((response) => response.json())
		.then((user) => {
			editUserModal.setAttribute("data-user-id", user.id);

			let modalContent = editUserModal.querySelector(".modal-content");

			modalContent.innerHTML = `
				<form id="editUserForm">
					<div class="modal-header">
						<h2>Modifier ${user.firstname} ${user.lastname}</h2>
						<span class="close" onclick="closeModal(editUserModal)">&times;</span>
					</div>
					<div class="modal-body">
						<div class="form-group">
							<label for="civilite">Civilité</label>
							<select name="civilite" id="civilite" required>
								<option value="madame" ${
									user.civilite === "madame" ? "selected" : ""
								}>Madame</option>
								<option value="monsieur"${
									user.civilite === "monsieur" ? "selected" : ""
								}>Monsieur</option>
							</select>
						</div>
						<div class="form-group">
							<label for="firstname">Prénom</label>
							<input type="text" name="firstname" id="firstname" value="${
								user.firstname
							}" required>
						</div>
						<div class="form-group">
							<label for="name">Nom</label>
							<input type="text" name="lastname" id="lastname" value="${
								user.lastname
							}" required>
						</div>
						<div class="form-group">
							<label for="address">Adresse</label>
							<input type="text" name="address" id="address" value="${user.address}" required>
						</div>
						<div class="form-group">
							<label for="cp">Code postal</label>
							<input type="text" name="cp" id="cp" value="${user.cp}" required>
						</div>
						<div class="form-group">
							<label for="city">Ville</label>
							<input type="text" name="city" id="city" value="${user.city}" required>
						</div>
						<div class="form-group">
							<label for="country">Pays</label>
							<input type="text" name="country" id="country" value="${user.country}" required>
						</div>
						<div class="form-group">
							<label for="birthday">Date de naissance</label>
							<input type="date" name="birthday" id="birthday" value="${
								user.birthday
							}" required>
						</div>
						<div class="form-group">
							<label for="phone">Téléphone</label>
							<input type="text" name="phone" id="phone" value="${user.phone}" required>
						</div>
						<div class="form-group">
							<label for="fax">Fax</label>
							<input type="text" name="fax" id="fax" value="${user.fax}" required>
						</div>
						<div class="form-group">
							<label for="url">Site web</label>
							<input type="url" name="url" id="url" value="${user.url}" required>
						</div>
						<div class="form-group">
							<label for="email">Email</label>
							<input type="email" name="email" id="email" value="${user.email}" required>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-danger" onclick="removeUser(${
							user.id
						})">Supprimer</button>
						<button type="button" class="btn btn-primary" onclick="editUser(${
							user.id
						})">Valider</button>
					</div>
				</form>
			`;
		});
}

function removeUser(id) {
	fetch(`http://localhost/annuaire_user/src/controllers/user.php?id=${id}`, {
		method: "DELETE",
	}).then(() => {
		closeModal(editUserModal);
		renderUsers();
	});
}

function addUser() {
	let civilite = document.getElementById("civilite").value;
	let firstname = document.getElementById("firstname").value;
	let lastname = document.getElementById("lastname").value;
	let address = document.getElementById("address").value;
	let cp = document.getElementById("cp").value;
	let city = document.getElementById("city").value;
	let country = document.getElementById("country").value;
	let birthday = document.getElementById("birthday").value;
	let phone = document.getElementById("phone").value;
	let fax = document.getElementById("fax").value;
	let url = document.getElementById("url").value;
	let email = document.getElementById("email").value;

	if (
		!civilite ||
		!firstname ||
		!lastname ||
		!address ||
		!cp ||
		!city ||
		!country ||
		!birthday ||
		!phone ||
		!fax ||
		!url ||
		!email
	) {
		alert("Veuillez remplir tous les champs.");
		return;
	}

	if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
		alert("L'email n'est pas valide.");
		return;
	}
	if (!url.match(/^(http|https):\/\/[^ "]+$/)) {
		alert("L'url n'est pas valide.");
		return;
	}

	fetch(`http://localhost/annuaire_user/src/controllers/users.php`, {
		method: "POST",
		body: JSON.stringify({
			civilite: civilite,
			firstname: firstname,
			lastname: lastname,
			address: address,
			cp: cp,
			city: city,
			country: country,
			birthday: birthday,
			phone: phone,
			fax: fax,
			url: url,
			email: email,
		}),
	}).then(() => {
		closeModal(addUserModal);
		renderUsers();
	});
}

function editUser(id) {
	let civilite = document.getElementById("civilite").value;
	let firstname = document.getElementById("firstname").value;
	let lastname = document.getElementById("lastname").value;
	let address = document.getElementById("address").value;
	let cp = document.getElementById("cp").value;
	let city = document.getElementById("city").value;
	let country = document.getElementById("country").value;
	let birthday = document.getElementById("birthday").value;
	let phone = document.getElementById("phone").value;
	let fax = document.getElementById("fax").value;
	let url = document.getElementById("url").value;
	let email = document.getElementById("email").value;

	if (
		!civilite ||
		!firstname ||
		!lastname ||
		!address ||
		!cp ||
		!city ||
		!country ||
		!birthday ||
		!phone ||
		!fax ||
		!url ||
		!email
	) {
		alert("Veuillez remplir tous les champs.");
		return;
	}

	if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
		alert("L'email n'est pas valide.");
		return;
	}
	if (!url.match(/^(http|https):\/\/[^ "]+$/)) {
		alert("L'url n'est pas valide.");
		return;
	}

	fetch(`http://localhost/annuaire_user/src/controllers/user.php?id=${id}`, {
		method: "PUT",
		body: JSON.stringify({
			civilite: civilite,
			firstname: firstname,
			lastname: lastname,
			address: address,
			cp: cp,
			city: city,
			country: country,
			birthday: birthday,
			phone: phone,
			fax: fax,
			url: url,
			email: email,
		}),
	}).then(() => {
		closeModal(editUserModal);
		renderUsers();
	});
}

function openAddUserModal() {
	addUserModal.style.display = "flex";

	let modalContent = addUserModal.querySelector(".modal-content");

	modalContent.innerHTML = `
		<div class="modal-header">
			<h2>Ajouter un utilisateur</h2>
			<span class="close" onclick="closeModal(addUserModal)">&times;</span>
		</div>
		<div class="modal-body">
			<form>
				<div class="form-group">
					<label for="civilite">Civilité</label>
					<select name="civilite" id="civilite" required>
						<option value="madame">Madame</option>
						<option value="monsieur">Monsieur</option>
					</select>
				</div>
				<div class="form-group">
					<label for="firstname">Prénom</label>
					<input type="text" name="firstname" id="firstname" required>
				</div>
				<div class="form-group">
					<label for="name">Nom</label>
					<input type="text" name="lastname" id="lastname" required>
				</div>
				<div class="form-group">
					<label for="address">Adresse</label>
					<input type="text" name="address" id="address" required>
				</div>
				<div class="form-group">
					<label for="cp">Code postal</label>
					<input type="text" name="cp" id="cp" required>
				</div>
				<div class="form-group">
					<label for="city">Ville</label>
					<input type="text" name="city" id="city" required>
				</div>
				<div class="form-group">
					<label for="country">Pays</label>
					<input type="text" name="country" id="country" required>
				</div>
				<div class="form-group">
					<label for="birthday">Date de naissance</label>
					<input type="date" name="birthday" id="birthday" required>
				</div>
				<div class="form-group">
					<label for="phone">Téléphone</label>
					<input type="text" name="phone" id="phone" required>
				</div>
				<div class="form-group">
					<label for="fax">Fax</label>
					<input type="text" name="fax" id="fax" required>
				</div>
				<div class="form-group">
					<label for="url">Site web</label>
					<input type="url" name="url" id="url" required>
				</div>
				<div class="form-group">
					<label for="email">Email</label>
					<input type="email" name="email" id="email" required>
				</div>
			</form>
		</div>
		<div class="modal-footer">
			<button class="btn btn-primary" onclick="addUser()">Valider</button>
		</div>
	`;
}

function closeModal(modal) {
	modal.style.display = "none";

	modal.querySelector(".modal-content").innerHTML = "";
}

// Events
usersSearchInput.addEventListener("keyup", renderUsers);
addUserModalButton.addEventListener("click", openAddUserModal);
document.querySelectorAll(".close").forEach((button) => {
	button.addEventListener("click", () => {
		closeModal(editUserModal);
		closeModal(addUserModal);
	});
});
window.addEventListener("click", function (event) {
	if (event.target.classList.contains("modal")) {
		closeModal(editUserModal);
		closeModal(addUserModal);
	}
});
document.addEventListener("keydown", function (event) {
	if (event.key === "Escape") {
		closeModal(editUserModal);
		closeModal(addUserModal);
	}
});

// Beggining
renderUsers();
