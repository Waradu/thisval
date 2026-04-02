import thistyp from ".";

// Mock type

const value = {} as {
  type: "item";
  name: string;
  count?: number;
  location?: string;
};

// Tests

thistyp.has.keys(value, "type", "count");
thistyp.has.requiredKeys(value, "type", "name");
thistyp.has.exactKeys(value, "type", "name", "count", "location");

thistyp.is.type<"item">(value.type);
thistyp.is.optional(value.count);

thistyp.fn.returns<string>(() => "test");

thistyp.are.maybe<string>(value.name, value.location);
