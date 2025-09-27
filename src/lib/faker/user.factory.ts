import { faker } from "@faker-js/faker";

export const createUser = () => {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
  };
};

export function createUsers(count: number) {
  return Array.from({ length: count }, () => createUser());
}
