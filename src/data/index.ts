import { TestPackage } from './types';
import { test1 } from './test1';
import { test2 } from './test2';
import { test3 } from './test3';
import { test4 } from './test4';
import { test5 } from './test5';

export * from './types';
export * from './scoring';
export * from './tipsData';

export const ALL_TEST_PACKAGES: TestPackage[] = [
  test1,
  test2,
  test3,
  test4,
  test5,
];

export function getTestById(id: string): TestPackage | undefined {
  return ALL_TEST_PACKAGES.find(t => t.id === id);
}

