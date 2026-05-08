import thistyp, { type Assert, type IsEqual } from ".";

// --- Mock type ---

const value = {} as {
  type: "item";
  name: string;
  count?: number;
  location?: string;
};

// --- Tests ---

thistyp.has.keys(value, "type", "count");
thistyp.has.requiredKeys(value, "type", "name");
thistyp.has.exactKeys(value, "type", "name", "count", "location");

thistyp.is.type<"item">(value.type);
thistyp.is.optional(value.count);

thistyp.fn.returns<string>(() => "test");

thistyp.are.maybe<string>(value.name, value.location);

// --- Assert ---

type T1 = "a" | "b";
type T2 = "a" | "b";
type T3 = "a" | "c";

type _1 = Assert<IsEqual<T1, T2>>

// @ts-expect-error Is Not Equal
type _2 = Assert<IsEqual<T1, T3>>

// --- Negative Tests ---

// @ts-expect-error "no" does not exist
thistyp.has.keys(value, "no");
// @ts-expect-error "count" is optional
thistyp.has.requiredKeys(value, "count");
// @ts-expect-error "count" is missing
thistyp.has.exactKeys(value, "type", "name", "location");

// @ts-expect-error type is "item"
thistyp.is.type<"book">(value.type);
// @ts-expect-error "name" is not optional
thistyp.is.optional(value.name);

// @ts-expect-error "1" is not of type string
thistyp.fn.returns<string>(() => 1);

// @ts-expect-error "count" is not a string or undefined
thistyp.are.maybe<string>(value.count, value.location);
