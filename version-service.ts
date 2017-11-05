
export function generate(event: any, context: any, callback: any): void {

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      version: '3.1.1'})
  };
  callback(null, response);
}
