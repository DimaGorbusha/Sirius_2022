#----------------------main----------------------
from flask import Flask, url_for, render, session, redirect 


app = Flask(__name__)
m

@app.route("/", methods=['POST', 'GET'])
def index():
	if 'userLogged' in session:
		return redirect(url_for('admin'))
	elif request.method == 'POST' and request.form['password'] == "N$/N?o":
		session['userLogged'] = request.form['password']
		return redirect(url_for('admin'))


@app.route("/admin")
def admin_site(password):
	if 'userLogged' not in session or session['userLogged'] != password:
		abort(401)


@app.route("/test/<int:test_number>")
def test_info(test_number):
	return f"Номер теста: {test_number}"


@app.route("/create_test")
def create_test():
	return "abeba"


if __name__ == "__main__":
	app.run(debug = True)
