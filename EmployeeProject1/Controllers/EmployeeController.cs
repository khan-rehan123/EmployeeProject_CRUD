using EmployeeProject1.EmployeeDao;
using EmployeeProject1.Models;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeProject1.Controllers
{
    public class EmployeeController : Controller
    {
        private readonly EmployeeDbContext context;

        public EmployeeController(EmployeeDbContext context )
        {
            this.context = context;
        }

        public IActionResult Index()
        {
            

            return View();
        }

        [HttpGet]
        public JsonResult GetAllEmployee()
        {
            var employee = context.Employees.ToList();
            return Json(employee);
        }

        [HttpPost]
        public JsonResult Insert(Employee employee)
        {
            if (ModelState.IsValid)
            {
                context.Employees.Add(employee);
                context.SaveChanges();
                return Json("Employee Details saved");

            }
            else
            {
                return Json("Model validation Failed");
            }

        }

        [HttpGet]
        public JsonResult Edit(int id)
        {
            var employee = context.Employees.Find(id);
            return Json(employee);
        }
        [HttpPost]
        public JsonResult Update(Employee employee)
        {
            if (ModelState.IsValid)
            {
                context.Employees.Update(employee);
                context.SaveChanges();
                return Json("Employee Updated Successfully..");
            }
            return Json("Employee update faild");
        }


        public JsonResult Delete(int id)
        {
            try
            {
                
                var employee = context.Employees.FirstOrDefault(e => e.Id == id);

                if (employee == null)
                {
                    return Json(new { success = false, message = "Employee not found." });
                }

                
                context.Employees.Remove(employee);
                context.SaveChanges();

                return Json(new { success = true, message = "Employee deleted successfully." });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "Error deleting employee: " + ex.Message });
            }
        }





    }
}
