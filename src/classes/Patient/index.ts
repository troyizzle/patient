export class Patient {
  id?: number | null;
  first_name: string;
  last_name: string
  source: string

  constructor(first_name?: string, last_name?: string, source?: string, id?: number) {
    this.id = id || null
    this.first_name = first_name || ""
    this.last_name = last_name || ""
    this.source = source || "react"
  }
}
