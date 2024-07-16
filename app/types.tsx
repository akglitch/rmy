// types.ts or types.d.ts
export interface RecordData {
    _id: string;
    year: string;
    month: string;
    date_received: string;
    log_time: string;
    serial_no: string;
    from_whom_received: string;
    date_of_letter: string;
    letter_ref_no: string;
    received_by: string;
    type_of_letter: string;
    subject: string;
  }
  

  export interface outgoingRecordData {
    _id: string;
    year: string;
    month: string;
    serial_no: string;
    date_received: string;
    date_dispatched: string;
    reference_no: string;
    folio_no: string;
    addressee: string;
    mode_of_dispatch: string;
    subject: string;
  }
  