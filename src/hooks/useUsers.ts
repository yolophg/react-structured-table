import { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';
import { User, UserWithComputedFields } from '@/types/User';
import { calculateDSR } from '@/utils/calculateDSR';

function generateUsers(count: number): User[] {
  const users: User[] = [];
  
  for (let i = 0; i < count; i++) {
    users.push({
      id: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      city: faker.location.city(),
      registeredDate: faker.date.between({ 
        from: '2020-01-01', 
        to: new Date() 
      }),
    });
  }
  
  return users;
}

function addComputedFields(user: User): UserWithComputedFields {
  return {
    ...user,
    fullName: `${user.firstName} ${user.lastName}`,
    dsr: calculateDSR(user.registeredDate),
  };
}

export function useUsers() {
  const [users, setUsers] = useState<UserWithComputedFields[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      
      const rawUsers = generateUsers(500);
      const usersWithComputedFields = rawUsers.map(addComputedFields);
      
      setTimeout(() => {
        setUsers(usersWithComputedFields);
        setLoading(false);
      }, 100);
    };

    loadUsers();
  }, []);

  return { users, loading, setUsers };
} 