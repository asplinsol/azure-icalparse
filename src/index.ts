import { AzureFunction, Context } from "@azure/functions"
import { parseICS, CalendarComponent } from "ical";

interface Incoming {
    "function": {
        "name": string;
        "id": string;
        "type": string;
    },
    "body": {
      "@odata.type": string;
      "id": string;
      "name": string;
      "contentType": string;
      "size": number;
      "contentBytes": string;
  }
}

const emailIn: AzureFunction =  function (context: Context, data: Incoming) {
  const icsRecord = Buffer.from(data.body.contentBytes, 'base64').toString();
  const regex_method = /^METHOD:([A-Z]*)$/gm;
  const regex_prodid = /^PRODID:(.*)$/gm;
  const method = (regex_method.exec(icsRecord) || ["NOTFOUND"]).pop();
  const prodid = (regex_prodid.exec(icsRecord) || ["NOTFOUND"]).pop();
  const ics = parseICS(icsRecord);
  const events = new Array<CalendarComponent>();
  for (let k in ics) {
    if (ics.hasOwnProperty(k)) {
            var ev = ics[k];
            if (ev.type == 'VEVENT') {
              events.push(ev);
            }
    }
  }  
  context.res = {
    body: {
      method,
      prodid,
      events
    }
  };
  context.done();
}
export default emailIn;
