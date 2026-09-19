import getStatus, {
  computeAverage,
  EnrollmentStatus
} from "./gradeUtils";

interface Enrollee {
  name: string;
  prelim: number;
  midterm: number;
  final: number;
}

interface EligibilityReport {
  name: string;
  average: number;
  status: EnrollmentStatus;
  remarks?: string;
}

type BatchId = string | number;

const enrollees: Enrollee[] = [
  { name: "Ana Cruz", prelim: 85, midterm: 90, final: 88 },
  { name: "Bea Santos", prelim: 70, midterm: 65, final: 60 },
  { name: "Cid Ramos", prelim: 95, midterm: 92, final: 97 },
  { name: "Dex Alonzo", prelim: 60, midterm: 55, final: 50 },
  { name: "Eli Tan", prelim: 78, midterm: 80, final: 76 }
];

function getEnrollees(): Promise<Enrollee[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const connectionSuccessful = true;

      if (connectionSuccessful) {
        resolve(enrollees);
      } else {
        reject(new Error("Unable to connect to the registrar API."));
      }
    }, 500);
  });
}

function groupBy<T>(
  items: T[],
  keyFn: (item: T) => string
): Record<string, T[]> {
  return items.reduce<Record<string, T[]>>((groups, item) => {
    const key = keyFn(item);

    if (!groups[key]) {
      groups[key] = [];
    }

    groups[key].push(item);

    return groups;
  }, {});
}

function displayBatchId(batchId: BatchId): void {
  if (typeof batchId === "string") {
    console.log(`Batch ID: ${batchId.toUpperCase()}`);
  } else {
    console.log(`Batch ID: ${batchId}`);
  }
}

async function generateReport(): Promise<void> {
  try {
    const batchId: BatchId = "IT313-2026-03";

    displayBatchId(batchId);

    const data: Enrollee[] = await getEnrollees();

    const reports: EligibilityReport[] = data.map(
      (enrollee: Enrollee): EligibilityReport => {
        const average: number = computeAverage(
          enrollee.prelim,
          enrollee.midterm,
          enrollee.final
        );

        const status: EnrollmentStatus = getStatus(average);

        const report: EligibilityReport = {
          name: enrollee.name,
          average,
          status
        };

        if (status === EnrollmentStatus.Probation) {
          report.remarks = "Needs consultation";
        }

        return report;
      }
    );

    const classAverage: number =
      reports.reduce(
        (total: number, report: EligibilityReport): number =>
          total + report.average,
        0
      ) / reports.length;

    const groupedReports: Record<string, EligibilityReport[]> =
      groupBy(
        reports,
        (report: EligibilityReport): string => report.status
      );

    const passingCount: number =
      groupedReports[EnrollmentStatus.Passing]?.length ?? 0;

    console.log("");
    console.log("=== IT313 Enrollment Eligibility Report (TypeScript) ===");

    reports.forEach((report: EligibilityReport): void => {
      const remarks: string = report.remarks
        ? ` - ${report.remarks}`
        : "";

      console.log(
        `${report.name.padEnd(12)} - Average: ${report.average.toFixed(
          2
        )} - ${report.status}${remarks}`
      );
    });

    console.log(`Class Average: ${classAverage.toFixed(2)}`);
    console.log(`Passing: ${passingCount} / ${reports.length}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Registrar connection failed: ${error.message}`);
    } else {
      console.error("An unknown registrar connection error occurred.");
    }
  }
}

generateReport();