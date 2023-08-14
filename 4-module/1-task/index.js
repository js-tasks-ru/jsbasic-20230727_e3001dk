function makeFriendsList (friends) {
  const friendsList = document.createElement('ul');

  for (let friend of friends) {
    const listItem = document.createElement('li');
    listItem.textContent = `${friend.firstName} ${friend.lastName}`;
    friendsList.append(listItem);
  }

  return friendsList;
}
