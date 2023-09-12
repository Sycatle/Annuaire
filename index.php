<?php
    /*

    Créer des fiches contenant : civilité, nom, prénom, adresse, cp, ville, pays, date de naissance, téléphone, fax, email (avec vérification de l'intégrité du format), url (avec vérification de l'intégrité du format).
    • Lister des fiches
    • Modifier des fiches

    */
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contacts</title>

    <link rel="stylesheet" href="assets/css/index.css">
</head>
<body>
    <header>
        <a class="brand" href="">
            <h1>Contacts</h1>
            <svg width="36" height="36" fill="currentColor" viewBox="0 0 24 24"><path d="M8 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" fill-rule="evenodd" clip-rule="evenodd"></path><path d="M11 14a1 1 0 0 1 1 1v6h2v-6a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v6h2v-6a1 1 0 0 1 1-1h6Z"></path><path d="M22 11h-6v2h6v-2Z"></path><path d="M16 15h6v2h-6v-2Z"></path><path d="M22 7h-6v2h6V7Z"></path></svg>
        </a>
        <input type="text" name="search" id="usersSearchInput" placeholder="Rechercher un utilisateur">
    </header>

    <section>
        <div class="container">
            <p id="usersCount"></p>
            <table>
                <thead>
                    <tr>
                        <th>Avatar</th>
                        <th>Nom</th>
                    </tr>
                </thead>
                <tbody id="usersTableBody"></tbody>
            </table>
        </div>
    </section>

    <!-- Modals -->
    <div id="editUserModal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <p>Contenu de la modal edition ici.</p>
        </div>
    </div>
    <div id="addUserModal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <p>Contenu de la modal ajout ici.</p>
        </div>
    </div>
    <!-- End of modals -->

    <!-- Buttons -->
    <button id="addUserModalButton">
        <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24"><path d="M8 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" fill-rule="evenodd" clip-rule="evenodd"></path><path d="M11 14a1 1 0 0 1 1 1v6h2v-6a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v6h2v-6a1 1 0 0 1 1-1h6Z"></path><path d="M18 7h2v2h2v2h-2v2h-2v-2h-2V9h2V7Z"></path></svg>
    </button>
    <!-- End of buttons -->

    <!-- Scripts -->
    <script src="assets/js/index.js"></script>
    <!-- End of scripts -->
</body>
</html>