import { store } from '../redux/store';
import { EntityType, UserStatus } from '../const';

export type Row = {
  id: number;
  name: JSX.Element;
  body: JSX.Element;
  add?: JSX.Element;
};

export type EntityConnection = {
  child_id: number;
  id: number;
  parent_id: number;
  type_connection_id: number;
};

export type Course = {
  id: number;
  name: string;
  description: string;
};

export type Entity = {
  id: number;
  name: string;
  type: string;
  size: string;
  description: null;
  study_time: null;
};

export type AllData = {
  courses: [];
  entities: Entity[];
  entity_connections: EntityConnection[];
};

export type TypeConnections = {
  id: number;
  parent_type: EntityType;
  child_type: EntityType;
  parent_column_name: string;
  child_column_name: string;
}

export type UserData = {
  id: number;
  name: string;
  email: string;
  status: UserStatus;
  created_at: string;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;