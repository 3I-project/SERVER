class AuthService {
  
  saveUser(user) {}

  registrationEmployee(data) {
    console.log(data, 'Сотрудник успешно зарегистрирован')
  }

  registrationOrganization(data) {
    console.log(data, 'организация успешно зарегистрирована')
  }
}

module.exports.AuthService = new AuthService();