// Master in brackets
$(document).ready(function () {

    const base_url = 'http://localhost:7000';

    $('#listusers').click(function () {
        $.get(base_url + '/lu', function (data, status) {
            let s = '';
            s += '<h2>List Users</h2>';
            s += '<table class="table">';
            s += '<tr>';
            s += '<th>Email</th>';
            s += '<th>Login</th>';
            s += '<th>Password</th>';
            s += '<th>Qualified mailbox name</th>';
            s += '<th>Bcc</th>';
            s += '<th>Subject</th>';
            s += '<th>Body</th>';
            s += '</tr>';
            for (let d in data) {
                s += '<tr>';
                s += '<td>' + m[email] + '</td>';
                s += '<td>' + m[login] + '</td>';
                s += '<td>' + m[password] + '</td>';
                s += '<td>' + m[qualifiedMailboxName] + '</td>';
                s += '</tr>';
            }
            s += '</table>';

            $('#answer').html(s);
        });
    });

    $('#imap_all_messages').click(function () {
        $.get(base_url + '/imap', function (data, status) {
            let s = '';
            s += '<h2>Messages</h2>';
            s += '<table class="table">';
            s += '<tr>';
            s += '<th>' + m[messageId] + '</th>';
            s += '<th>' + m[from] + '</th>';
            s += '<th>' + m[to] + '</th>';
            s += '<th>' + m[cc] + '</th>';
            s += '<th>' + m[bcc] + '</th>';
            s += '<th>' + m[subject] + '</th>';
            s += '<th>' + m[body] + '</th>';
            s += '</tr>';
            for (let d in data) {
                s += '<tr>';
                s += '<td>' + m[messageId] + '</td>';
                s += '<td>' + m[from] + '</td>';
                s += '<td>' + m[to] + '</td>';
                s += '<td>' + m[cc] + '</td>';
                s += '<td>' + m[bcc] + '</td>';
                s += '<td>' + m[subject] + '</td>';
                s += '<td>' + m[body] + '</td>';
                s += '</tr>';
            }
            s += '</table>';

            $('#answer').html(s);
        });
    });

});
