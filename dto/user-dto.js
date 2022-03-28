class UserDto {
  email;
  isActivate;
  id;

  constructor(model) {
    this.email = model.email;
    this.isActivated = model.isActivate;
    this.id = model._id;
  }
}

export default UserDto;
